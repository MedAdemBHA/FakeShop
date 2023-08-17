import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  FUNDING,
} from "@paypal/react-paypal-js";

type Order = {
  id: string;
  // Add other properties if needed
};

type OrderData = {
  // Add properties based on your response data
};

const style = {
  layout: "vertical",
  size: "small",
  label: "pay",
  height: 199,
  tagline: "false",
  borderRadius: 10,
};

async function createOrder(): Promise<string> {
  try {
    const response = await fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: [
            {
              sku: "etanod01",
              quantity: 1,
            },
          ],
        }),
      }
    );

    const order: Order = await response.json();
    // Your code here after creating the order
    return order.id;
  } catch (error) {
    // Handle error
    throw error;
  }
}

async function onApprove(data: { orderID: string }): Promise<void> {
  try {
    const response = await fetch(
      "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    );

    const orderData: OrderData = await response.json();
    // Your code here after capturing the order
  } catch (error) {
    // Handle error
    throw error;
  }
}

const ButtonWrapper: React.FC<{ showSpinner: boolean }> = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        disabled={false}
        forceReRender={[style]}
        createOrder={createOrder}
        onApprove={onApprove}
        className="m-3"
      />
    </>
  );
};
function Paypal() {
  return (
    <div style={{ maxWidth: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}

export default Paypal;
