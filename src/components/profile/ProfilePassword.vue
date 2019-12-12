<template>
  <div class="col-md-6">
    <div class="edit-profile-head">
      <h3>edit profile</h3>
    </div>
    <div class="edit-profile-details">
      <form action="">
        <div class="edit-name-field">
          <label class="edit-profile">current password</label>
          <div class="input-group">
            <input type="password" class="edit-data" />
          </div>
        </div>
        <div class="edit-contact-field">
          <label class="edit-profile">new password</label>
          <div class="input-group">
            <input type="password" id="" class="edit-data" />
          </div>
        </div>
        <div class="edit-email-field">
          <label class="edit-profile">confirm password</label>
          <div class="input-group">
            <input type="password" class="edit-data" />
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
  name: "ProfilePassword"
};
</script>

<style></style>
