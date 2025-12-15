export function getWeeksInMonth(year, month) {
    const weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const dayOfWeek = firstDay.getDay(); // 0 (Sun) - 6 (Sat)

    let currentWeek = [];

    // Pad previous month
    for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(i);
    }

    // Pad next month
    while (currentWeek.length < 7) {
        currentWeek.push(null);
    }
    weeks.push(currentWeek);

    return weeks;
}
