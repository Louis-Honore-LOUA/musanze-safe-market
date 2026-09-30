import { MarketStall } from '../types';

export const STALLS: MarketStall[] = [
  { id: '1', name: 'Kinigi Fresh Potatoes', zone: 'Zone A', category: 'Produce',     status: 'Pending',   priority: 'High' },
  { id: '2', name: 'Muhoza Butchery',       zone: 'Zone B', category: 'Meat & Fish', status: 'Flagged',   priority: 'High' },
  { id: '3', name: 'Susa Grain Corner',     zone: 'Zone A', category: 'Grains',      status: 'Inspected', priority: 'Low' },
  { id: '4', name: 'Volcano Fabrics',       zone: 'Zone C', category: 'Textiles',    status: 'Pending',   priority: 'Medium' },
  { id: '5', name: 'Cyuve Home Supplies',   zone: 'Zone D', category: 'Household',   status: 'Inspected', priority: 'Low' },
  { id: '6', name: 'Ruhengeri Phone Repair',zone: 'Zone D', category: 'Electronics', status: 'Flagged',   priority: 'Medium' },
];