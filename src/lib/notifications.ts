import nodemailer from 'nodemailer';
import User from '@/models/User';
import Exam from '@/models/Exam';
import News from '@/models/News';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    await transporter.sendMail({
      from: `"My Exam Dashboard" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function sendDeadlineReminders() {
  try {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // Find exams with application deadline in 7 days
    const upcomingDeadlines = await Exam.find({
      applicationEndDate: {
        $gte: new Date(),
        $lte: sevenDaysFromNow,
      },
    }).populate('categoryId');

    for (const exam of upcomingDeadlines) {
      // Find users who have saved this exam
      const users = await User.find({
        savedExams: exam._id,
      });

      for (const user of users) {
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Application Deadline Reminder</h2>
            <p>Hi ${user.name},</p>
            <p>The application deadline for <strong>${exam.name}</strong> is approaching!</p>
            <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>Exam:</strong> ${exam.name}</p>
              <p><strong>Category:</strong> ${(exam.categoryId as any).name}</p>
              <p><strong>Application Deadline:</strong> ${exam.applicationEndDate.toLocaleDateString()}</p>
              <p><strong>Exam Date:</strong> ${exam.examDate.toLocaleDateString()}</p>
            </div>
            <p>Don't miss this opportunity! Apply now.</p>
            <a href="${process.env.NEXT_PUBLIC_URL}/exams/${exam._id}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Exam Details
            </a>
          </div>
        `;

        await sendEmail({
          to: user.email,
          subject: `Deadline Reminder: ${exam.name}`,
          html,
        });
      }
    }
  } catch (error) {
    console.error('Error sending deadline reminders:', error);
  }
}

export async function sendNewExamNotifications(newExam: any) {
  try {
    // Find users who follow this category
    const users = await User.find({
      preferences: newExam.categoryId,
    });

    for (const user of users) {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Exam Added</h2>
          <p>Hi ${user.name},</p>
          <p>A new exam has been added in your preferred category!</p>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Exam:</strong> ${newExam.name}</p>
            <p><strong>Application Start:</strong> ${newExam.applicationStartDate.toLocaleDateString()}</p>
            <p><strong>Application Deadline:</strong> ${newExam.applicationEndDate.toLocaleDateString()}</p>
            <p><strong>Exam Date:</strong> ${newExam.examDate.toLocaleDateString()}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_URL}/exams/${newExam._id}" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View Exam Details
          </a>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject: `New Exam: ${newExam.name}`,
        html,
      });
    }
  } catch (error) {
    console.error('Error sending new exam notifications:', error);
  }
}

export async function sendNewsNotifications(news: any) {
  try {
    // Find users who follow this category
    const users = await User.find({
      preferences: news.category,
    });

    for (const user of users) {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Latest Exam News</h2>
          <p>Hi ${user.name},</p>
          <p>New exam-related news has been published in your preferred category!</p>
          <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="margin-top: 0;">${news.title}</h3>
            <p>${news.summary}</p>
            <p><strong>Category:</strong> ${news.category}</p>
          </div>
          <a href="${process.env.NEXT_PUBLIC_URL}/news" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Read More News
          </a>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject: `Exam News: ${news.title}`,
        html,
      });
    }
  } catch (error) {
    console.error('Error sending news notifications:', error);
  }
}
