export class Utilities {
    
    static getFormattedDate (date: Date): string {
        const dayName = date.toLocaleDateString('default', {weekday: 'long'});
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
      
        return `${dayName} ${day}${Utilities.daySuffix(day)} ${month}`;
    }

    static daySuffix (day: number): string {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
    }

    static toCapitalCase (str: string): string {
        return str
        .toLowerCase()
        .split(/[\s-]+/) // Split by any whitespace or hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
}