import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      const contactFormData = new FormData (evt.currentTarget)
      const lastName = contactFormData.get("lastName")
      const firstName = contactFormData.get("firstName")
      const selection = contactFormData.get("selection")
      const email = contactFormData.get("email")
      const message = contactFormData.get("message")

      const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,}$/

      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        if (lastName.trim() !== "" && firstName.trim() !== "" && selection !== "" && emailRegExp.test(email.trim()) && message.trim() !== "") {
          onSuccess();
        }
        else {
          onError()
        }
      }
      catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field name="lastName" placeholder="" label="Nom"/>
          <Field name="firstName" placeholder="" label="Prénom"/>
          <Select
            name="selection"
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field name="email" placeholder="" label="Email"/>
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
