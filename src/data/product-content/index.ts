import type { ProductLongForm } from './types';
import vehicleFinance from './vehicle-finance';
import equipmentFinance from './equipment-finance';
import businessLoans from './business-loans';
import invoiceFinance from './invoice-finance';
import assetFinance from './asset-finance';
import merchantCashAdvance from './merchant-cash-advance';
import cashflowFinance from './cashflow-finance';
import scaffoldingFinance from './scaffolding-finance';

export type { ProductLongForm, ProductContentSection } from './types';

const productContent: Record<string, ProductLongForm> = {
  'vehicle-finance': vehicleFinance,
  'equipment-finance': equipmentFinance,
  'business-loans': businessLoans,
  'invoice-finance': invoiceFinance,
  'asset-finance': assetFinance,
  'merchant-cash-advance': merchantCashAdvance,
  'cashflow-finance': cashflowFinance,
  'scaffolding-finance': scaffoldingFinance,
};

export function getProductLongForm(slug: string): ProductLongForm | undefined {
  return productContent[slug];
}
