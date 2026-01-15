export class Helpers {
  static generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static getCurrentDate() {
    return new Date().toISOString().split('T')[0];
  }

  static getCurrentTime() {
    return new Date().toISOString().split('T')[1].split('.')[0];
  }

  static getActionDate(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  }

  static randomFirstName() {
    const names = ["Ram", "Molly", "Venka", "Thato", "Fatima", "Venay"];
    return names[Math.floor(Math.random() * names.length)];
  }

  static actionDateGetCurrentDateTime() {

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const result = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log(result); // You will see the T here
    return result;
  }

  static getCurrentDateTime() {
    const now = new Date();

    const pad = (num) => String(num).padStart(2, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
  static getExactFormatCurrentDateTime() {
    const datePart = Helpers.getCurrentDate(); // "2026-01-15"
    const timePart = new Date().toTimeString().slice(0, 8);

    const output = `${datePart}T${timePart}`;
    console.log(output);

    return output;
  }

}

