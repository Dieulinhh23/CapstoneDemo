export const services = [
  { id: 's1', name: 'Classic Manicure', price: 25, durationMin: 30 },
  { id: 's2', name: 'Gel Manicure', price: 40, durationMin: 45 },
  { id: 's3', name: 'Classic Pedicure', price: 35, durationMin: 40 },
  { id: 's4', name: 'Gel Pedicure', price: 50, durationMin: 50 },
  { id: 's5', name: 'Acrylic Full Set', price: 65, durationMin: 75 },
  { id: 's6', name: 'Nail Art (per nail)', price: 5, durationMin: 10 },
];

export const technicians = [
  { id: 't1', name: 'Mai Tran', specialties: ['Gel', 'Nail Art'] },
  { id: 't2', name: 'Kevin Pham', specialties: ['Acrylic', 'Pedicure'] },
  { id: 't3', name: 'Linh Nguyen', specialties: ['Manicure', 'Gel'] },
];

export const availableSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '2:30 PM', '4:00 PM',
];

export const customerAppointments = [
  { id: 'a1', service: 'Gel Manicure', technician: 'Mai Tran', date: '2026-09-20', time: '2:00 PM', status: 'Upcoming' },
  { id: 'a2', service: 'Classic Pedicure', technician: 'Kevin Pham', date: '2026-09-05', time: '11:00 AM', status: 'Completed' },
];

export const loyaltyPoints = 120;

export const employeeSchedule = [
  { id: 'w1', day: 'Monday', hours: '9:00 AM - 5:00 PM' },
  { id: 'w2', day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
  { id: 'w3', day: 'Wednesday', hours: 'Off' },
  { id: 'w4', day: 'Thursday', hours: '11:00 AM - 7:00 PM' },
  { id: 'w5', day: 'Friday', hours: '11:00 AM - 7:00 PM' },
];

export const employeeAppointments = [
  { id: 'e1', customer: 'Sarah Lee', service: 'Gel Manicure', time: '2:00 PM', date: '2026-09-20' },
  { id: 'e2', customer: 'Jenny Vo', service: 'Nail Art', time: '3:00 PM', date: '2026-09-20' },
];

export const employees = [
  { id: 'emp1', name: 'Mai Tran', role: 'Nail Technician', status: 'Active' },
  { id: 'emp2', name: 'Kevin Pham', role: 'Nail Technician', status: 'Active' },
  { id: 'emp3', name: 'Linh Nguyen', role: 'Nail Technician', status: 'On Leave' },
];

export const inventory = [
  { id: 'inv1', item: 'Gel Polish - Red', qty: 12, lowStock: false },
  { id: 'inv2', item: 'Acrylic Powder', qty: 3, lowStock: true },
  { id: 'inv3', item: 'Nail Files', qty: 40, lowStock: false },
  { id: 'inv4', item: 'UV Top Coat', qty: 2, lowStock: true },
];

export const reports = {
  weeklyIncome: 3450,
  totalAppointments: 87,
  mostPopularService: 'Gel Manicure',
  busiestDay: 'Saturday',
};
