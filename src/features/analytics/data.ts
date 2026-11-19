// Monthly counts. Each customer is attributed to one acquisition channel.
export interface MonthlyMetrics {
  month: string;
  revenue: number;
  costs: number;
  revenueTarget: number;
  orders: number;
  prospects: number;
  qualified: number;
  channels: { organic: number; direct: number; referrals: number; paid: number };
  openingCustomers: number;
  retainedCustomers: number;
  completed: number;
  onTime: number;
  hoursUsed: number;
  hoursAvailable: number;
  ratings: [number, number, number, number, number]; // Counts from 1 to 5 stars
}

export const channelLabels = {
  organic: "Orgánico", direct: "Directo", referrals: "Referidos", paid: "De pago",
};

export function acquired(row: MonthlyMetrics) {
  return Object.values(row.channels).reduce((sum, count) => sum + count, 0);
}

export const ratio = (part: number, total: number) => total > 0 ? part / total : null;

export function summarize(rows: MonthlyMetrics[]) {
  const sum = (read: (row: MonthlyMetrics) => number) => rows.reduce((total, row) => total + read(row), 0);
  const revenue = sum(row => row.revenue);
  const costs = sum(row => row.costs);
  const customers = sum(acquired);
  const prospects = sum(row => row.prospects);
  const orders = sum(row => row.orders);
  const opening = sum(row => row.openingCustomers);
  const retained = sum(row => row.retainedCustomers);
  const ratings = Array.from({ length: 5 }, (_, index) => sum(row => row.ratings[index]));
  const responses = ratings.reduce((total, count) => total + count, 0);
  const completed = sum(row => row.completed);
  return {
    revenue, costs, customers, prospects, orders, completed, ratings, responses,
    profit: revenue - costs, target: sum(row => row.revenueTarget),
    margin: ratio(revenue - costs, revenue), conversion: ratio(customers, prospects),
    avgOrder: ratio(revenue, orders), retention: ratio(retained, opening),
    churn: ratio(opening - retained, opening), qualified: sum(row => row.qualified),
    onTime: ratio(sum(row => row.onTime), completed),
    utilization: ratio(sum(row => row.hoursUsed), sum(row => row.hoursAvailable)),
    csat: ratio(ratings[3] + ratings[4], responses),
    score: ratio(ratings.reduce((total, count, i) => total + count * (i + 1), 0), responses),
    channels: Object.entries(channelLabels).map(([key, label]) => ({
      label, value: sum(row => row.channels[key as keyof typeof channelLabels]),
    })).sort((a,b) => b.value - a.value),
  };
}

// Two complete years provide an immediately preceding comparison for every preset.
const revenueHistory = [22,26,24,30,32,29,34,31,39,35,42,44,38,42,40,46,43,49,46,54,48,62,55,69];
let opening = 740;
export const demoMonths: MonthlyMetrics[] = revenueHistory.map((volume, index) => {
  const revenue = volume * 1230;
  const prospects = volume * 101 + index * 24;
  const customers = Math.round(prospects * (.047 + (index % 5) * .002 + index * .0004));
  const organic = Math.round(customers * (.38 + (index % 4) * .013));
  const direct = Math.round(customers * .28);
  const referrals = Math.round(customers * (.17 + (index % 3) * .01));
  const retainedCustomers = Math.round(opening * (.927 + (index % 4) * .005));
  const completed = volume * 4 + index;
  const row: MonthlyMetrics = {
    month: new Date(Date.UTC(2024, 10 + index, 1)).toISOString().slice(0, 7),
    revenue, costs: Math.round(revenue * (.63 - (index % 5) * .018)), revenueTarget: (32 + index * 1.7) * 1230,
    orders: volume * 10 + index * 7, prospects, qualified: Math.round(prospects * (.34 + (index % 4) * .01)),
    channels: { organic, direct, referrals, paid: customers - organic - direct - referrals },
    openingCustomers: opening, retainedCustomers, completed, onTime: Math.round(completed * (.91 + (index % 4) * .012)),
    hoursUsed: volume * 17, hoursAvailable: (volume + 12) * 18,
    ratings: [3 + index % 2, 4 + index % 5, 9 + index % 4, volume, volume * 3 + index],
  };
  opening = retainedCustomers + customers;
  return row;
});
