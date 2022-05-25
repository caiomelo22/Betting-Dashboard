import moment from "moment";

export default class GeneralServices {
  format_value(value) {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    return formatter.format(value);
  }

  format_date(dateText) {
    return moment(dateText).format('DD-MM-YYYY');
  }

  serialize(obj) {
    const str = [];
    for (const p in obj) {
      if (obj[p] != null) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }
}
