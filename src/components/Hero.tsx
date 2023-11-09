export default async function Hero() {

  async function loginSubmit(FormData: FormData) {
    "use server"

    const email = FormData.get("email")?.toString()
    const password = FormData.get("password")?.toString()

    const res = await fetch('/api/v1/login', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })

    if (res.status === 200) {
      console.log(`Login successful - ${res.json()}`)
    } else {
      console.log(`Login unsuccessful - ${res.json()}`)
    }
  }

  return (
    <div>
      <h1>HOME</h1>
    </div>
  )
}
