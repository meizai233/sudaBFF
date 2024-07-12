// 请求方法 请求处理逻辑
// export default {
//   method: "GET",
//   handler: async (ctx) => {
//     console.log("ctx.req.body", ctx.request.body);

//     const { username } = ctx.user;
//     ctx.body = "my name is " + username;
//     // throw Error("Error!!!!!");
//   },
// };

// example/controller/user/getinfo.ts
export default {
  method: "GET",
  handler: async (ctx) => {
    const sql = `INSERT INTO user_table(username,nickname)
      VALUES('fwy1','suda1')`;
    ctx.mysql.query(sql, function (error, results, fields) {
      if (error) throw error;
      console.log("The results is:", results);
    });

    ctx.body = `my name is sudaaaa`;
  },
};
