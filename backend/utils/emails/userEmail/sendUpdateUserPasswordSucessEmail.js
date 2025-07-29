const sendEmail = require('../../sendEmail');

const sendUpdateUserPasswordSuccessEmail = async ({ fullName, email }) => {
  const message = `<p>You have successfully updated your name and email</p>
  <p>If this was not done by you, kindly reach out to the support team</p>
  `;

  return sendEmail({
    to: email,
    subject: 'You have updated your name and email',
    html: `<h4>Hello, ${fullName}</h4>
   ${message}
   `,
  });
};

module.exports = sendUpdateUserPasswordSuccessEmail;
