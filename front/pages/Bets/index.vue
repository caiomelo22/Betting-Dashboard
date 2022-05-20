<template>
  <v-container>
    <table class="bets-data-table">
      <thead>
        <th v-for="(header, i) in bets_headers" :key="i">{{ header }}</th>
      </thead>
      <tbody>
        <tr v-for="(bet, i) in bets" :key="i">
          <td>
            {{ generalServices.format_date(bet.match.matchDate) }}
          </td>
          <td>
            {{ `${bet.match.homeTeam.name} x ${bet.match.awayTeam.name}` }}
          </td>
          <td>
            {{ bet.type }}
          </td>
          <td>
            {{ generalServices.format_value(bet.value) }}
          </td>
          <td>
            <i class="fa-regular fa-user"></i>
            <!-- <font-awesome-icon v-if="bet.won" icon class="fa-solid fa-check" />
            <font-awesome-icon v-else icon class="fa-solid fa-x" /> -->
          </td>
          <td>
            {{ generalServices.format_value(bet.profit) }}
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script src="./index"></script>

<style scoped>
</style>