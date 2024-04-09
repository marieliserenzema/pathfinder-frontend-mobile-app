async function login(email: string, password: string) {
    try {
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    return response; 
    } catch (error) {
      return error ;
    }
};


// const register = async (email: string, password: string, username: string) => {
//     try {
//       const response = await fetch('http://127.0.0.1:3000/auth/login', {
//         method: 'POST',
//         body: JSON.stringify({
//           username: username,
//           email: email,
//           password: password,
//         }),
//       });
//       console.log(response); 
//     } catch (error) {
//       console.error(error);
//     }
// };


export default { login};