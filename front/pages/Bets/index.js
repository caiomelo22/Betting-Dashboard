import ApiService from "@/services/ApiService";
import GeneralServices from "@/services/GeneralServices";
export default {
  name: 'Bets',
  data: () => ({
    generalServices: new GeneralServices(),
    api: new ApiService(),
    bets: []
  }),
  computed: {
    bets_headers() {
      return [
        'Date', 'Matchup', 'Bet Type', 'Value', 'Won', 'Profit'
      ]
    }
  },
  async created() {
    await this.get_bets();
  },
  methods: {
    async get_bets() {
      await this.$axios.get('bet/list')
      .then((resp) => {
        this.bets = resp.data
      })
      .catch((err) => {
        this.$toast.error(err.message)
      });
    }
  }
}