import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendStatusEmail = async (
  email,
  title,
  status,
  remark
) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: "Project Sahayata - Report Status Updated",

    html: `
      <h2>Your Report Status Changed</h2>

      <p><b>Report:</b> ${title}</p>

      <p><b>Status:</b> ${status}</p>

      <p><b>Remark:</b> ${remark}</p>

      <br>

      <p>Thank you for reporting pollution ❤️</p>
    `,
  });

};