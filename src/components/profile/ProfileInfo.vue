<template>
  <div class="col-md-6">
    <div class="edit-profile-head">
      <h3>edit profile</h3>
    </div>
    <div class="edit-profile-details">
      <form action="">
        <div class="edit-name-field">
          <label class="edit-profile">name</label>
          <div class="input-group">
            <input type="text" class="edit-data" value="Bruce Wayne" />
          </div>
        </div>
        <div class="edit-contact-field">
          <label class="edit-profile">mobile number</label>
          <div class="input-group">
            <input
              type="intlTelInput"
              id="telephone"
              class="edit-data"
              value="+91 9400890923"
            />
          </div>
        </div>
        <div class="edit-email-field">
          <label class="edit-profile">email</label>
          <div class="input-group">
            <input type="email" class="edit-data" value="bruce@gmail.com" />
          </div>
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary update-now">
            update now
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo"
};
</script>

<style></style>
