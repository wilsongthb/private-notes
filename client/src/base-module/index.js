import { MOMENT_DATE_FORMAT, DEFAULT_LOCALE, DEFAULT_CURRENCY } from "./consts";
import moment from "moment";
import * as vueJsDatepickerLangs from "vuejs-datepicker/src/locale/index";
// Components
import alert from "./components/alert";
import badgeStatus from "./components/badge-status";
import buttonLoad from "./components/button-load";
import checkbox from "./components/checkbox";
import datePicker from "./components/date-picker";
import daypicker from "./components/daypicker";
import imageViewer from "./components/image-viewer";
import inputFileBCustom from "./components/input-file-bcustom";
import inputInteger from "./components/input-integer";
import inputMoney from "./components/input-money";
import inputNumber from "./components/input-number";
import inputPhoneNumber from "./components/input-phone-number";
import inputSearch from "./components/input-search";
import inputString from "./components/input-string";
import modalBasic from "./components/modal-basic";
import modalYesNo from "./components/modal-yn";
import paginate from "./components/paginate";
import progressBar from "./components/progressbar";
import selectCurrency from "./components/select-currency";
import selectDate from "./components/select-date";
import selectMateColor from "./components/select-mate-color";
import selectTime from "./components/select-time";
import selectYearMonth from "./components/select-year-month";
import smallFormErrors from "./components/small-form-errors";
import spanInput from "./components/span-input";
import spanMoney from "./components/span-money";
import spanPhoneNumber from "./components/span-phone-number";
import switchComponent from "./components/switch";
import tableRegisters from "./components/table-registers";
import textArea from "./components/textarea";
import ControlErrors from "./components/ControlErrors.vue";
import trWeekpicker from "./components/tr-weekpicker";
import ctrlYearMonth from "./components/ctrl-year-month";
import btnLoading from "./components/btn-loading";
import inputPassword from "./components/input-password";
import snackbar from "./components/snackbar";
import InputAmount from "./components/InputAmount.vue";
import ButtonSubmit from "./components/ButtonSubmit.vue";
import InvalidFeedback from "./components/InvalidFeedback.vue";
import Loading from "./components/Loading.vue";
import TrLoading from "./components/TrLoading.vue";
import ModalLoading from "./components/ModalLoading.vue";
import TableControl from "./components/TableControl.vue";
// import NumberControl from "./components/"
// Directives
import InputFocusedDirective from "./directives/input-focused-animation";
import TitleDirective from "./directives/title";
// Filters
import { percentFilter } from "./filters/percent-filter";
import {
  dateFormatFilter,
  relativeTimeFilter,
  calendarFilter,
  timeFormatFilter,
  dateTimeFormatFilter,
  simpleDateFormatFilter,
  ageFilter,
  momentFormat,
  dayOfWeek
} from "./filters/date-format-filter";
import acronimousFilter from "./filters/acronimous-filter";
import moneyFilter from "./filters/money-filter";
import numberFilter from "./filters/number-filter.js";
import { dayTimes } from "./day-times";
import routeMix from "./route-mix";

const BaseModule = {
  install: function (
    Vue,
    {
      currencyList = {
        1: { name: "SOLES", symbol: "S/", code: "PEN" }
      },
      defaultCurrency = DEFAULT_CURRENCY,
      locale = DEFAULT_LOCALE
    }
  ) {
    moment.locale(locale);
    spanMoney.currencyList = currencyList;
    spanMoney.defaultCurrency = defaultCurrency;
    selectCurrency.currencyList = currencyList;
    selectCurrency.defaultCurrency = defaultCurrency;
    daypicker.moment = moment;
    datePicker.moment = moment;
    datePicker.dateFormat = MOMENT_DATE_FORMAT;
    selectTime.moment = moment;
    trWeekpicker.moment = moment;
    ctrlYearMonth.moment = moment;

    if (vueJsDatepickerLangs[locale]) {
      datePicker.lang = vueJsDatepickerLangs[locale];
    } else {
      datePicker.lang = vueJsDatepickerLangs.en;
    }

    Vue.directive("app-input-focused", InputFocusedDirective);
    Vue.directive("app-title", TitleDirective);

    Vue.filter("percent", percentFilter);
    Vue.filter("dateFormat", dateFormatFilter(moment));
    Vue.filter("dateTimeFormat", dateTimeFormatFilter(moment));
    Vue.filter("relativeTime", relativeTimeFilter(moment));
    Vue.filter("calendar", calendarFilter(moment));
    Vue.filter("timeFormat", timeFormatFilter(moment));
    Vue.filter("simpleDateFormat", simpleDateFormatFilter(moment));
    Vue.filter("date", dateFormatFilter(moment));
    Vue.filter("dateTime", dateTimeFormatFilter(moment));
    Vue.filter("simpleDate", simpleDateFormatFilter(moment));
    Vue.filter("age", ageFilter(moment));
    Vue.filter("dayOfWeek", dayOfWeek(moment));
    Vue.filter("acronimous", acronimousFilter);
    Vue.filter("money", moneyFilter(defaultCurrency, currencyList));
    Vue.filter("momentFormat", momentFormat(moment));
    Vue.filter("number", numberFilter);

    Vue.component("app-alert", alert);
    Vue.component("app-badge-status", badgeStatus);
    Vue.component("app-button-load", buttonLoad);
    Vue.component("app-button-submit", ButtonSubmit);
    Vue.component("app-button-loading", ButtonSubmit);
    Vue.component("app-checkbox", checkbox);
    Vue.component("app-datepicker", datePicker);
    Vue.component("app-daypicker", daypicker);
    Vue.component("app-img-viewer", imageViewer);
    Vue.component("app-input-file", inputFileBCustom);
    Vue.component("app-input-integer", inputInteger);
    Vue.component("app-input-money", inputMoney);
    Vue.component("app-input-number", inputNumber);
    Vue.component("app-input-phonenumber", inputPhoneNumber);
    Vue.component("app-input-search", inputSearch);
    Vue.component("app-input-string", inputString);
    Vue.component("app-modal-basic", modalBasic);
    Vue.component("app-modal-yn", modalYesNo);
    Vue.component("app-paginate", paginate);
    Vue.component("app-progressbar", progressBar);
    Vue.component("app-select-currency", selectCurrency);
    Vue.component("app-select-date", selectDate);
    Vue.component("app-select-time", selectTime);
    Vue.component("app-select-ym", selectYearMonth);
    Vue.component("app-small-form-errors", smallFormErrors);
    Vue.component("app-control-errors", ControlErrors);
    Vue.component("app-select-mate-color", selectMateColor);
    Vue.component("app-span-input", spanInput);
    Vue.component("app-span-money", spanMoney);
    Vue.component("app-span-phonenumber", spanPhoneNumber);
    Vue.component("app-switch", switchComponent);
    Vue.component("app-table-registers", tableRegisters);
    Vue.component("app-textarea", textArea);
    Vue.component("app-tr-weekpicker", trWeekpicker);
    Vue.component("app-ctrl-year-month", ctrlYearMonth);
    Vue.component("app-btn-loading", btnLoading);
    Vue.component("app-input-password", inputPassword);
    Vue.component("app-snackbar", snackbar);
    Vue.component("app-invalid-feedback", InvalidFeedback);
    Vue.component("app-loading", Loading);
    Vue.component("app-tr-loading", TrLoading);
    Vue.component("app-input-amount", InputAmount);
    Vue.component("app-form-errors", smallFormErrors);
    Vue.component("app-modal-loading", ModalLoading);
    Vue.component("app-table-control", TableControl);
  }
};

export default BaseModule;
export { dayTimes, routeMix, BaseModule };
