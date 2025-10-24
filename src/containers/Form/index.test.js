import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button for a valid Form", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent.change(document.querySelector('input[name="lastName"]'), { target: { value: "Nom" } });
      fireEvent.change(document.querySelector('input[name="firstName"]'), { target: { value: "Prenom" } });
      fireEvent.change(document.querySelector('input[name="selection"]'), { target: { value: "Entreprise" } });
      fireEvent.change(document.querySelector('input[name="email"]'), { target: { value: "nom.prenom@email.com" } });
      fireEvent.change(document.querySelector('textarea[name="message"]'), { target: { value: "Message" } });
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
