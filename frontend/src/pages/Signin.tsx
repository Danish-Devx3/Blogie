import { Form } from "../components/Form"
import { Texts } from "../components/Texts"

export const Signin = () => {
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <Form type="signin"/>
          </div>

          <div className="hidden lg:block">
           <Texts/>
          </div>
        </div>

      </div>
    )
  }