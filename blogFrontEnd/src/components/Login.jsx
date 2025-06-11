import { useMutation } from "@tanstack/react-query";
import loginServices from "../services/login";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer"

const Login = () => {
  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: loginServices.login,
    onSuccess: (data) => {
      dispatch(loginUser(data))
    }
  })

  const handleLogin = (event) => {
    event.preventDefault()
    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          data-testid="username"
          name="username" />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          data-testid="password" />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;