export async function POST(request) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    let mockResponse;

    if (lastMessage.includes("saving money")) {
      mockResponse = `
Here are some **effective strategies for saving money**:

1. **Track Spending:** Use apps like Mint to see where your money goes.  
2. **Budget Smart:** Try the 50/30/20 rule—50% needs, 30% wants, 20% savings.  
3. **Cut Extras:** Cancel unused subscriptions and cook at home.  
4. **Automate Savings:** Set up transfers to a high-yield savings account.  
5. **Set Goals:** Save for something specific to stay motivated.

Which of these would you like to dive into?
      `;
    } else if (
      lastMessage.includes("budget") ||
      lastMessage.includes("budget smart")
    ) {
      mockResponse = `
The **50/30/20 rule** is a simple budgeting strategy:

- **50% Needs:** Essentials like rent, groceries, and utilities.  
- **30% Wants:** Non-essentials like dining out or entertainment.  
- **20% Savings:** Put this towards savings or debt repayment.

To create a monthly budget, list your income and expenses, then allocate them into these categories. Adjust as needed based on your situation. Would you like a step-by-step guide to set this up?

Here’s some additional text to make the response longer and test the scrollbar:

- **Step 1:** Calculate your monthly income after taxes.  
- **Step 2:** List all your essential expenses (needs).  
- **Step 3:** Allocate 50% of your income to these needs.  
- **Step 4:** Allocate 30% to wants, like hobbies or dining out.  
- **Step 5:** Put the remaining 20% into savings or debt repayment.  
- **Step 6:** Review and adjust your budget monthly to stay on track.  
- **Step 7:** Use budgeting apps to automate tracking.  
- **Step 8:** Set reminders to check your spending weekly.  
- **Step 9:** Celebrate small wins to stay motivated.  
- **Step 10:** Revisit your goals regularly to ensure they align with your budget.
      `;
    } else if (
      lastMessage.includes("investments") ||
      lastMessage.includes("investment options")
    ) {
      mockResponse = `
For beginners, here are some **investment options**:

1. **Index Funds:** Low-cost, diversified, and great for long-term growth.  
2. **ETFs:** Similar to index funds but trade like stocks.  
3. **Robo-Advisors:** Automated platforms like Betterment that manage your investments.  

Start small and focus on low-risk options. Want to learn more about any of these?
      `;
    } else if (
      lastMessage.includes("debt") ||
      lastMessage.includes("debt management")
    ) {
      mockResponse = `
To **manage and reduce debt**:

1. **Prioritize High-Interest Debt:** Pay off credit cards or loans with the highest interest rates first.  
2. **Use the Snowball Method:** Pay off smaller debts first for quick wins.  
3. **Negotiate Rates:** Contact lenders to lower your interest rates.  

Would you like tips on negotiating with lenders?
      `;
    } else {
      mockResponse = `
I’m here to help with financial advice! You can ask about saving, budgeting, investments, or debt management. What would you like to explore?
      `;
    }

    return new Response(JSON.stringify({ message: mockResponse.trim() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
