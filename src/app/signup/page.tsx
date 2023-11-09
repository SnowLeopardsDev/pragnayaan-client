"use client"
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function Signup() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "std"
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ vis: false, message: "" })

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data)
      router.push('/')
    } catch (error: any) {
      console.log("Signup failed:", error.response.data.error)
      setToast({
        vis: true,
        message: error.response.data.error
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      {toast.vis && <Toast msg={toast.message} />}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create a new account</h1>
          <p className="py-6">An easy to use app to experience smart travel. Check real-time location of buses, and get to your destination as early and comfortable as possible.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Full name" className="input input-bordered" value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Retype Password</span>
              </label>
              <input type="password" name="rePassword" placeholder="password" className="input input-bordered" value={user.rePassword} onChange={(e) => { setUser({ ...user, rePassword: e.target.value }) }} required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={onSignup}>{loading && <span className="loading loading-spinner loading-xs"></span>} Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
