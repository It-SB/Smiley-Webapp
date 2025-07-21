import crypto from "crypto";

export default async function handler(req, res) {
  const isLive = process.env.PAYFAST_MODE === "live";

  const payfastData = {
    merchant_id: isLive ? process.env.PAYFAST_MERCHANT_ID : "10000100",
    merchant_key: isLive ? process.env.PAYFAST_MERCHANT_KEY : "46f0cd694581a",
    return_url: `${req.headers.origin}/payment-success`,
    cancel_url: `${req.headers.origin}/payment-cancel`,
    notify_url: `${req.headers.origin}/api/payfast-webhook`,
    amount: "150.00",
    item_name: "SmileyJobs Premium Access",
    item_description: "Unlock job-seeker tools and job listings.",
    email_address: req.body.email,
  };

  const paramString = Object.entries(payfastData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const signature = crypto
    .createHash("md5")
    .update(`${paramString}&passphrase=${process.env.PAYFAST_PASSPHRASE}`)
    .digest("hex");

  const formFields = {
    ...payfastData,
    signature,
  };

  const formHtml = `
    <form id="payfast-form" action="${
      isLive
        ? "https://www.payfast.co.za/eng/process"
        : "https://sandbox.payfast.co.za/eng/process"
    }" method="post">
      ${Object.entries(formFields)
        .map(
          ([name, value]) =>
            `<input type="hidden" name="${name}" value="${value}" />`
        )
        .join("\n")}
    </form>
    <script>document.getElementById("payfast-form").submit();</script>
  `;

  res.status(200).send(formHtml);
}
