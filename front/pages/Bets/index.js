import ApiService from "@/services/ApiService";
import GeneralServices from "@/services/GeneralServices";
import AddBetDialog from "~/components/dialogs/AddBetDialog/index.vue";
export default {
  name: 'Bets',
  components: { AddBetDialog },
  data: () => ({
    generalServices: new GeneralServices(),
    api: new ApiService(),
    page: 1,
    totalPages: 1,
    loading: false,
    dialog: false,
    leagues: [],
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
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page);
    }
    await this.get_bets();
    await this.get_leagues();
  },
  methods: {
    async bet_added() {
      this.dialog = false
      await this.get_bets()
    },
    change_page() {
      this.$router.replace({
        query: { page: this.page }
      });
      this.get_bets();
    },
    async get_leagues() {
      await this.$axios.get(`league/list`)
        .then((resp) => {
          this.leagues = resp.data
        })
        .catch((err) => {
          this.$toast.error(err.message)
        });
    },
    async get_bets() {
      this.loading = true
      const params = this.generalServices.serialize({ page: this.page });
      await this.$axios.get(`bet/list?${params}`)
        .then((resp) => {
          this.bets = resp.data.bets
          this.totalPages = resp.data.totalPages
        })
        .catch((err) => {
          this.$toast.error(err.message)
        });
      this.loading = false
    }
  }
}