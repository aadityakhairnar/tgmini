import { createHmac } from "crypto"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { hash, ...userData } = req.body

  // Verify the data
  const secret = createHmac("sha256", "WebAppData").update(process.env.TELEGRAM_BOT_TOKEN).digest()

  const checkString = Object.keys(userData)
    .sort()
    .map((k) => `${k}=${userData[k]}`)
    .join("\n")

  const hmac = createHmac("sha256", secret).update(checkString).digest("hex")

  if (hmac !== hash) {
    return res.status(401).json({ message: "Invalid authentication" })
  }

  try {
    // Create or update the user in the database
    const user = await prisma.user.upsert({
      where: { telegramId: userData.id.toString() },
      update: {
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        photoUrl: userData.photo_url,
      },
      create: {
        telegramId: userData.id.toString(),
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        photoUrl: userData.photo_url,
      },
    })

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        telegramId: user.telegramId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    )

    res.status(200).json({ token, user })
  } catch (error) {
    console.error("Error in Telegram login:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

