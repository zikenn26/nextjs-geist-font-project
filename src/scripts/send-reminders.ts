import { sendDeadlineReminders } from '@/lib/notifications';
import dbConnect from '@/lib/mongodb';

async function runReminders() {
  try {
    console.log('Starting reminder service...');
    await dbConnect();
    await sendDeadlineReminders();
    console.log('Reminders sent successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error in reminder service:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runReminders();
}

export { runReminders };
