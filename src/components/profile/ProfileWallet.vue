<template>
  <div class="col-md-6">
    <div class="pao-wallet-head">
      <h3>pao wallet</h3>
    </div>
    <div class="wallet-history-details">
      <div class="row">
        <div class="wallet">
          <img src="../../assets/image/wallet.png" class="img-wallet" />
          <h4>₹500</h4>
          <span class="expiry-date">Expires on 03 May 2020</span>
        </div>
      </div>
      <table class="table table-borderless br-top">
        <tbody>
          <tr>
            <th scope="row"></th>
            <td colspan="2" class="monthly-usage">Allowed usage per month</td>
            <td class="monthly-usage-price">₹20,000</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td colspan="2" class="monthly-usage">Usage this month</td>
            <td class="monthly-usage-price">₹500</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    name:'ProfileWallet'
};
</script>

<style></style>
