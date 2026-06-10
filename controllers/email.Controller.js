const transporter = require("../config/email");

const contact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // ==========================================
    // Email to you
    // ==========================================
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px;">
        <div style="
          max-width:700px;
          margin:auto;
          background:#ffffff;
          border-radius:12px;
          overflow:hidden;
          border:1px solid #e2e8f0;
        ">

          <div style="
            background:#0f172a;
            padding:24px;
            color:white;
          ">
            <h2 style="margin:0;">New Portfolio Contact Request</h2>

            <p style="
              margin-top:8px;
              color:#cbd5e1;
            ">
              A visitor has submitted a contact form.
            </p>
          </div>

          <div style="padding:30px">

            <table width="100%" cellpadding="8">
              <tr>
                <td width="35%"><strong>Name</strong></td>
                <td>${name}</td>
              </tr>

              <tr>
                <td><strong>Email</strong></td>
                <td>${email}</td>
              </tr>

              <tr>
                <td><strong>Subject</strong></td>
                <td>${subject}</td>
              </tr>
            </table>

            <div style="
              margin-top:25px;
              padding:18px;
              border-radius:10px;
              background:#f8fafc;
              border:1px solid #e2e8f0;
            ">
              <h3 style="margin-top:0; text-align:center;">
                Message
              </h3>

              <div style="
                color:#475569;
                font-size:15px;
                line-height:1.8;
                text-align:left;
                white-space:pre-wrap;
              ">
                ${message}
              </div>
            </div>

          </div>

          <div style="
            background:#f8fafc;
            padding:20px;
            text-align:center;
            color:#64748b;
            font-size:12px;
          ">
            Submitted from Portfolio Contact Form
          </div>

        </div>
      </div>
    `;

    // ==========================================
    // Acknowledgement Email
    // ==========================================
    const acknowledgementHtml = `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px;">
        <div style="
          max-width:650px;
          margin:auto;
          background:#ffffff;
          border-radius:12px;
          overflow:hidden;
          border:1px solid #e2e8f0;
        ">

          <div style="
            background:#0f172a;
            padding:24px;
            color:white;
            text-align:center;
          ">
            <h2 style="margin:0;">
              Thanks for reaching out
            </h2>

            <p style="
              margin-top:8px;
              color:#cbd5e1;
            ">
              Your message has been received successfully.
            </p>
          </div>

          <div style="padding:30px;">

            <p style="
              color:#334155;
              line-height:1.8;
              margin-top:0;
            ">
              Hi <strong>${name}</strong>,
            </p>

            <p style="
              color:#475569;
              line-height:1.8;
            ">
              Thank you for contacting me.
              I have received your message regarding
              <strong>${subject}</strong>.
            </p>

            <p style="
              color:#475569;
              line-height:1.8;
            ">
              I'll review your inquiry and get back to you as soon as possible.
            </p>

            <div style="
              margin-top:20px;
              padding:18px;
              border-radius:10px;
              background:#f8fafc;
              border:1px solid #e2e8f0;
            ">
              <strong style="display:block;margin-bottom:10px;text-align:center;">
                Your Message
              </strong>

              <div style="
                color:#475569;
                line-height:1.7;
                white-space:pre-wrap;
              ">
                ${message}
              </div>
            </div>

            <p style="
              margin-top:25px;
              color:#475569;
              line-height:1.8;
            ">
              Best Regards,
              <br />
              <strong>Yugesh Karan</strong>
            </p>

          </div>

          <div style="
            background:#f8fafc;
            padding:20px;
            text-align:center;
            color:#64748b;
            font-size:12px;
          ">
            This is an automated acknowledgement email.
          </div>

        </div>
      </div>
    `;

    // Send to yourself
    await transporter.sendMail({
      from: `"Portfolio Website" <${process.env.MAIL_USER}>`,
      to: process.env.EMAIL_PROVIDER,
      replyTo: email,
      subject: `Portfolio Contact - ${subject}`,
      html: adminHtml,
    });

    // Send acknowledgement to sender
    await transporter.sendMail({
      from: `"Yugesh Karan" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Message Received Successfully",
      html: acknowledgementHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Contact Form Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = { contact };