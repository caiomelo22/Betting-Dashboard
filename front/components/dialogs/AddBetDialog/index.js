import NumberField from "~/components/textFields/NumberField/index.vue";
import ValidationService from "~/services/ValidationService";
import { NumberFieldEnum } from "~/shared/enums/NumberFieldEnum";
export default {
  name: 'AddBetDialog',
  components: { NumberField },
  computed: {
    bet_type_options() {
      return [
        'Moneyline',
        'Total'
      ]
    }
  },
  data: () => ({
    validationService: new ValidationService(),
    bet: {
      leagueId: null,
      homeTeamId: null,
      awayTeamId: null,
      matchDate: null,
      value: null,
      odds: null,
      type: null,
      prediction: null,
      line: null
    },
    winnerPrediction: null,
    teamOptions: [],
    numberFieldEnum: NumberFieldEnum
  }),
  props: {
    Leagues: Array
  },
  created() {
    this.bet.matchDate = this.$moment().format('YYYY-MM-DD')
  },
  methods: {
    winner_prediction_changed() {
      switch (this.winnerPrediction) {
        case this.bet.homeTeamId:
          this.bet.prediction = 'Home'
          break;
        case this.bet.awayTeamId:
          this.bet.prediction = 'Away'
          break;
      }
    },
    get_winner_options() {
      if (!this.bet.leagueId) {
        return []
      }
      const leagueSelected = this.Leagues.find(x => x.id === this.bet.leagueId)
      return [
        leagueSelected.teams.find(x => x.id === this.bet.homeTeamId),
        leagueSelected.teams.find(x => x.id === this.bet.homeTeamId)
      ]
    },
    league_changed(league) {
      this.bet.homeTeamId = null;
      this.bet.awayTeamId = null;
      this.teamOptions = league.teams;
    },
    submit() {

    }
  }
}