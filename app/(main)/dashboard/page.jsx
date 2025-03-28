import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Budget and Overview */}
        <div className="lg:col-span-3 space-y-6">
          {/* Budget Progress Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
            <BudgetProgress
              initialBudget={budgetData?.budget}
              currentExpenses={budgetData?.currentExpenses || 0}
            />
          </section>

          {/* Dashboard Overview Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Transaction Summary</h2>
            <DashboardOverview
              accounts={accounts}
              transactions={transactions || []}
            />
          </section>
        </div>

        {/* Right Column - Accounts */}
        <div className="lg:col-span-1">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Your Accounts</h2>
            <CreateAccountDrawer>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-32">
                  <Plus className="h-8 w-8 mb-2" />
                  <p className="text-sm font-medium">Add New Account</p>
                </CardContent>
              </Card>
            </CreateAccountDrawer>

            <div className="space-y-4">
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No accounts yet. Create one to get started!
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
