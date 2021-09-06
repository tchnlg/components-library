<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import { Accordion, AccordionItem } from "../Accordion";

  const meta = {
    title: "Accordion",
    component: Accordion,
    onClick: { action: "onClick" },
    argTypes: {
      align: {
        control: {
          type: "select",
          options: ["start", "end"],
        },
      },
    },
    args: {
      align: "end",
      disabled: false,
    },
  };
</script>

<Meta {...meta} />

<Story name="Default" let:args>
  <Accordion {...args}>
    <AccordionItem title="Naturddal Language Classifier">
      <p>
        Natural Language Classifier uses advanced natural language processing
        and machine learning techniques to create custom classification models.
        Users train their data and the service predicts the appropriate category
        for the inputted text.
      </p>
    </AccordionItem>
    <AccordionItem title="Natural Language Understanding">
      <p>
        Analyze text to extract meta-data from content such as concepts,
        entities, emotion, relations, sentiment and more.
      </p>
    </AccordionItem>
    <AccordionItem title="Language Translator">
      <p>
        Translate text, documents, and websites from one language to another.
        Create industry or region-specific translations via the service's
        customization capability.
      </p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="Item Opened" let:args>
  <Accordion {...args}>
    <AccordionItem open title="Naturddal Language Classifier">
      <p>
        Natural Language Classifier uses advanced natural language processing
        and machine learning techniques to create custom classification models.
        Users train their data and the service predicts the appropriate category
        for the inputted text.
      </p>
    </AccordionItem>
    <AccordionItem title="Natural Language Understanding">
      <p>
        Analyze text to extract meta-data from content such as concepts,
        entities, emotion, relations, sentiment and more.
      </p>
    </AccordionItem>
    <AccordionItem title="Language Translator">
      <p>
        Translate text, documents, and websites from one language to another.
        Create industry or region-specific translations via the service's
        customization capability.
      </p>
    </AccordionItem>
  </Accordion>
</Story>

<Story name="Item Disabled" let:args>
  <Accordion {...args}>
    <AccordionItem disabled title="Naturddal Language Classifier">
      <p>
        Natural Language Classifier uses advanced natural language processing
        and machine learning techniques to create custom classification models.
        Users train their data and the service predicts the appropriate category
        for the inputted text.
      </p>
    </AccordionItem>
    <AccordionItem title="Natural Language Understanding">
      <p>
        Analyze text to extract meta-data from content such as concepts,
        entities, emotion, relations, sentiment and more.
      </p>
    </AccordionItem>
    <AccordionItem title="Language Translator">
      <p>
        Translate text, documents, and websites from one language to another.
        Create industry or region-specific translations via the service's
        customization capability.
      </p>
    </AccordionItem>
  </Accordion>
</Story>
