import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button for a valid Form", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent.change(document.querySelector('input[name="lastName"]'), { target: { value: "Nom" } });
      fireEvent.change(document.querySelector('input[name="firstName"]'), { target: { value: "Prenom" } });
      fireEvent.change(document.querySelector('input[name="selection"]'), { target: { value: "Entreprise" } });
      fireEvent.change(document.querySelector('input[name="email"]'), { target: { value: "nom.prenom@email.com" } });
      fireEvent.change(document.querySelector('textarea[name="message"]'), { target: { value: "Message" } });
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
