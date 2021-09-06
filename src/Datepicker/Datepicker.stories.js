import Datepicker from "./Datepicker.svelte";
import { action } from "@storybook/addon-actions";

const noWeekendsSelectableCallback = (date) =>
  date.getDay() !== 0 && date.getDay() !== 6;
const today = new Date();
const tomorrow = new Date(today.getTime() + 1000 * 3600 * 24);

const daysOfWeek = [
  ["Domingo", "Dom"],
  ["Lunes", "Lun"],
  ["Martes", "Mar"],
  ["Miércoles", "Mié"],
  ["Jueves", "Jue"],
  ["Viernes", "Vie"],
  ["Sábado", "Sáb"],
];
const monthsOfYear = [
  ["Enero", "Ene"],
  ["Febrero", "Feb"],
  ["Marzo", "Mar"],
  ["Abril", "Abr"],
  ["Mayo", "May"],
  ["Junio", "Jun"],
  ["Julio", "Jul"],
  ["Agosto", "Ago"],
  ["Septiembre", "Sep"],
  ["Octubre", "Oct"],
  ["Noviembre", "Nov"],
  ["Diciembre", "Dic"],
];

export default {
  title: "Datepicker",
  component: Datepicker,
  args: {
    labelText: "Pick the date",
    error: false,
    errorText: "Error text",
    disabled: false,
    format: "#{m}/#{d}/#{Y}",
    selectableCallback: noWeekendsSelectableCallback,
    start: today,
    end: new Date(2025, 0, 1),
    selected: tomorrow,
  },
};

const Template = ({ ...args }) => ({
  Component: Datepicker,
  props: args,
  on: {
    open: action("onOpen"),
    close: action("onClose"),
    dateSelected: action("onDateSelected"),
  },
});

export const Default = Template.bind({});

export const Localized = Template.bind({});
Localized.args = {
  daysOfWeek: daysOfWeek,
  monthsOfYear: monthsOfYear,
  labelText: "Escoge el dia",
  errorText: "La fecha no es elegida",
};
