const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name_phoneNo_email_service } = req.body;

  if (!name_phoneNo_email_service) {
    return res
      .status(400)
      .json({
        error: "Missing required field: name_phoneNo_email_service",
      });
  }

  var [name, phoneNo, email, service] =
    name_phoneNo_email_service.split("_");

    if (email.includes("at") && email.includes("dot com")) {
        email = email
        .replace(/\s*at\s*/gi, "@")
        .replace(/\s*dot\s*com\s*/gi, ".com")
        .replace(/\s+/g, "") // remove extra spaces if any remain
        .trim();       
      }

  if (!name || !phoneNo || !email) {
    return res
      .status(400)
      .json({
        error: "Invalid format for name_phoneNo_email_service",
      });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;

  if (
    !smtpHost ||
    !smtpPort ||
    !smtpUser ||
    !smtpPass ||
    !emailFrom ||
    !emailTo
  ) {
    return res
      .status(500)
      .json({ error: "Server configuration is incomplete" });
  }

  let transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort, 10),
    secure: true, 
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  let mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: `New Lead from Ream Roofing AI - ${name}`,
    text: `
      Hi Admin,

      You have a new free estimate lead from Ream Roofing AI.

      Name: ${name}
      Phone No: ${phoneNo}
      Email: ${email}
      Type of Roofing Service: ${service}
    

      Best,
      AI Assistant
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};