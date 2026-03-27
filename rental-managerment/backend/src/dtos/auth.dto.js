class AuthDTO {
  static loginResponse(account, token) {
    const profileId = account.role === "master" ? account.masterId?._id : account.userId?._id;
    const profileName =
      account.role === "master" && account.masterId
        ? account.masterId.name
        : account.role === "user" && account.userId
          ? account.userId.name
          : account.username;

    const userData = {
      id: account._id,
      username: account.username,
      role: account.role,
      name: profileName,
      profileId: profileId,
    };

    return {
      message: "Đăng nhập thành công",
      token: token,
      user: userData,
      ...userData,
    };
  }

  static registerRequest(data) {
    return {
      username: data.username ? data.username.trim() : "",
      password: data.password,
      role: ["admin", "master", "user"].includes(data.role) ? data.role : "user",
      name: data.name ? data.name.trim() : "",
      phone: data.phone ? data.phone.trim() : "",
      email: data.email ? data.email.trim() : "",
      address: data.address ? data.address.trim() : "",
    };
  }

  static loginRequest(data) {
    return {
      username: data.username ? data.username.trim() : "",
      password: data.password,
    };
  }
}

module.exports = AuthDTO;
