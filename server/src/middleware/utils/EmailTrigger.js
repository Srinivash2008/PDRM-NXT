import moment from "moment";
import { sendEmail } from "./EmailServices.js";

const submittedArticleToProduction = async (result) => {

  try {
    const to = `${process.env.SEND_TO_EMAIL_ADDRESS}`;
    const articleId = result?.online_art_no;
    const subject = `New manuscript submitted for production:  ${result?.online_journal_name} -  ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');

    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear <b>Production</b>,</p>
        <p>The following manuscript is now available at PDMR ready for production:</p>
        <p>To download the file please click this link: <a target='_blank' href="${result?.online_art_received_file_name}">Download File</a></p>
          <p>MS-ID: ${result?.online_journal_name} -  ${articleId}</p>
        <p>Comments:</p>
         <p>${result?.online_art_notes || 'No additional comments provided.'}</p>

        <p> Kind  regards,</p>
        <br>
        <p>
        Radcliff.
        </p>
      </body>
      </html>
    `;

    const cc = [];
    const bcc = [

    ];

    // console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;

  } catch (error) {
    console.error('Error sending email:', error);
  }
};

//  Article for Copyedit
const ArticleForCopyedit = async (result) => {
  try {
    console.log(result, "result");

    const to = result?.toEmail;
    const articleId = result?.online_art_no;
    const subject = `Article for Copyedit: ${result?.journal_name} - ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');
    const wordCount = result?.online_send_count;
    const returnDate = result?.online_expected_date;
    const comments = result?.online_send_comment;
    // uploadUrl
    const text = `
    <html>
    <body>
      <p>${formattedDate}</p>
      <p>Dear ${result?.copy_edit_name},</p> 
      <p>Please find a file for copyediting at the following download link. <a target='_blank' href="${result?.online_send_file_name}">Download File</a> </p>
      <p>There are ${wordCount} words in the file.</p>
      <p>We would like the paper returned by <b>${returnDate}</b>.</p>
      <p>Please note the following comment(s) on this article:</p>
      <p>${comments}</p>
      <p>When the paper is complete, please click <a target='_blank' href="${result?.uploadUrl}"> UPLOAD </a> to upload the copyedited files.</p>
      <br><p>Thank you in advance.</p>
      <br><p>Kind regards,</p>
      <br>
     <p>
      Compuscript (Production team)
      </p>
    </body>
    </html>
    `;

    const cc = result?.ccEmail;
    const bcc = result?.bccEmail;

    console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;

  } catch (error) {
    console.error('Error sending email:', error);
  }
}

//revert email 

const ArticleRevertEmail = async (result) => {
  try {
    console.log(result, "result");
    
    const to = result?.toEmail;
    const articleId = result?.online_art_no;
    const subject = `Reverted Article: ${result?.journal_name} - ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');
    const revertReason = result?.revert_reason; 

    const text = `
    <html>
    <body>
      <p>${formattedDate}</p>
      <p>Dear ${result?.copy_edit_name},</p> 
      <p>We would like to inform you that the article with ID <b>${articleId}</b> has been reverted.</p>
      <p>Please see the reason for the reversion below:</p>
      <p><b>${revertReason}</b></p>
      <p>If you have any questions or need further clarification, please do not hesitate to reach out.</p>
      <br><p>Thank you for your understanding.</p>
      <br><p>Kind regards,</p>
      <br>
     <p>
      Compuscript (Production team)
      </p>
    </body>
    </html>
    `;

    const cc = result?.ccEmail;
    const bcc = result?.bccEmail;

    console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;

  } catch (error) {
    console.error('Error sending revert email:', error);
  }
}


//  ce proof to author mail

const CEProofToAuthor = async (result) => {
  try {
    const authorNames = JSON.parse(result?.online_author_name || '[]');
    const authorEmails = JSON.parse(result?.online_author_email || '[]');
    const articleId = result?.article_no;
    const subject = `Check your copyedited proof: ${result?.online_journal_name} -  ${articleId}`;
    const formattedDate = moment().format('DD MMMM YYYY');
    const to = authorEmails.join(', ');
    const authorsList = authorNames.join(', ');
    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear ${authorsList},</p>
        <p>I hope this email finds you well! My name is Radcliff, and I am the Production Assistant for Radcliffe Cardiology.</p>
        <p>Your copyedited manuscript is now available for your review, which contains author queries listed as comments.</p>
        <p>We would be most grateful if you could provide your answers to these queries by <b>${result?.online_expected_date}</b>.</p>
        <p>To download the file, please click this link: <a target='_blank' href="${result?.online_send_file_name}">Download</a></p>
        <p>Please answer all queries directly in the document using the commenting tool. Any additional changes can also be added directly into the text, which will be marked up with track changes.</p>
        <p>Please note that this version is considered the accepted version of your manuscript, and any major changes to the text at this stage will be rejected.</p>
        <p>Once we have incorporated your changes, we will provide a typeset PDF proof for your approval or any further corrections.</p>
        <p>To upload your revised manuscript, please click this link: <a target='_blank' href="${result?.uploadUrl}"> UPLOAD </a> </p>
        <br><p>I look forward to hearing from you!</p>
        <br><p>Kind regards,<br></p>
        <p>
        Radcliff </p> 
        <p> <br>Production Assistant<br></p>
        <p>Radcliffe Cardiology</p>
        </p>
      </body>
      </html>
    `;

    const cc = result?.ccEmail;
    const bcc = result?.bccEmail;

    console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;

  } catch (error) {
    console.error('Error sending email:', error);
  }
};

//  author to production
const AuthorToProduction = async (result) => {
  try {
    const to = `${process.env.SEND_TO_EMAIL_ADDRESS}`;
    const articleId = result?.online_art_no;
    const subject = `Prepare galley proof: ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');

    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear Production,</p>
        <p>The following article is now available at PDMR ready to prepare galley proof:</p>
        <p>Article ID: <b>${articleId}</b></p>
        <p>To download the file, please click this link: <a target='_blank' href="${result?.online_art_received_file_name}">Download Manuscript</a></p>
        <p>Comments:</p>
        <p>Please complete the task as soon as possible.</p>
        <br><p>Kind regards, </p><br>
        <p> Author<br>(Article ID: ${articleId}) 
        </p>
      </body>
      </html>
    `;

    const cc = [];
    const bcc = [
    ];

    // console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Galley proof to Author
const GalleyProofToAuthor = async (result) => {
  try {
    const to = `${process.env.SEND_TO_EMAIL_ADDRESS}`;
    const articleId = result?.article_no;
    const subject = `Check your proof PDF: ${result?.journal_name} - ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');

    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear Author,</p>
        <p>Please find the PDF of your article <b>${articleId}</b>.</p>
        <p>Please review the proof copy carefully and return it within 3 days.</p>
        <p>To download the file, please click this link: <a target='_blank' href="${result?.online_rec_file_name}">Download </a></p>
        <p>Please address all queries directly in the PDF proof, and any additional changes can also be made using the annotation tools.</p>
        <p>Please note that this version is the accepted manuscript, and any major changes at this stage will not be accepted.</p>
        <p>To upload the revised file, please click this link: <a target='_blank' href="#">Upload Revised File</a></p>
        <br>
        <p>I look forward to hearing from you.</p>
        <br>
        <p>Kind regards,<br>
        Radcliff<br>
        Production Assistant<br>
        (#####Test email id########)
        </p>
      </body>
      </html>
    `;

    const cc = [];
    const bcc = [
    ];

    // console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");
    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Revises from Author to Production
const RevisesFromAuthorToProduction = async (result) => {
  try {
    const to = `${process.env.SEND_TO_EMAIL_ADDRESS}`;
    const articleId = result?.article_no;
    const subject = `Author's Corrections Available: ${result?.online_journal_name} -  ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');

    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear Production,</p>
        <p>The following article is now ready for you to check the First Look updates:</p>
        <p><b>MS-ID:</b> ${result?.online_journal_name} -  ${articleId} </p>
        <p>To download the file, please click this link: <a target='_blank' href="${result?.online_edit_rec_file_name}">Download </a></p>
        <p><b>Comments:</b></p>
        <p>Please complete this task as soon as possible.</p>
        <br>
        <p>Kind regards, </p><br>
        <p>Author <br>
        ${result?.online_journal_name} -  ${articleId}
        </p>
      </body>
      </html>
    `;

    const cc = [];
    const bcc = [];

    // console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Revised proof to PE
const RevisedProofToPE = async (result) => {
  try {
    const to = 'production@example.com';
    const articleId = result?.online_art_no;
    const subject = `Final Proof for Your Approval: ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');

    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear Production Manager,</p>
        <p>Please find the final PDF of article <b>${articleId}</b>.</p>
        <p>Please review and provide us with your approval.</p>
        <p>To download the file, please click here: <a target='_blank' href="${result?.final_pdf_link}">Download </a></p>
        <p>To upload the file, please click here: <a target='_blank' href="#">Upload File</a></p>
        <br>
        <p>I look forward to hearing from you.</p>
        <br>
        <p>Kind regards,<br>
        Radcliff<br>
        Production Assistant
        </p>
      </body>
      </html>
    `;

    const cc = [];
    const bcc = [];

    // console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Revises/Approval from PE
const RevisesApprovalFromPE = async (result) => {
  try {
    const to = 'production@example.com';
    const articleId = result?.online_art_no;
    const subject = `Article Has Been Approved: ${articleId}`;

    const formattedDate = moment().format('DD MMMM YYYY');

    const text = `
      <html>
      <body>
        <p>${formattedDate}</p>
        <p>Dear Production,</p>
        <p>The following article has been approved for publication:</p>
        <p><b>MS-ID:</b> ${articleId}</p>
        <p>To download the file, please click here: <a target='_blank' href="${result?.final_pdf_link}">Download </a></p>
        <p>Please find below the information for Online Publication:</p>
        <p>Thank you.</p>
        <br>
        <p>Kind regards,<br>
        Radcliff
        </p>
      </body>
      </html>
    `;

    const cc = [];
    const bcc = [];

    // console.log(to, subject, text, cc, bcc, "to, subject, text, cc, bcc");

    const mailResult = await sendEmail(to, subject, text, cc, bcc);
    return mailResult;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};




export {
  submittedArticleToProduction,
  CEProofToAuthor,
  AuthorToProduction,
  GalleyProofToAuthor,
  RevisesFromAuthorToProduction,
  RevisedProofToPE,
  RevisesApprovalFromPE,
  ArticleForCopyedit,
  ArticleRevertEmail,
};