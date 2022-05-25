<template>
  <v-card>
    <v-card-title>Manage Bet</v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation @submit.stop.prevent="submit">
        <div>
          <span class="text-field-label">League</span>
          <v-select
            v-model="bet.leagueId"
            :items="Leagues"
            item-text="name"
            item-value="id"
            outlined
            dense
            filled
            :rules="[validationService.required(bet.leagueId)]"
            class="text-field"
            @change="league_changed"
          />
        </div>
        <div>
          <span class="text-field-label">Home Team</span>
          <v-select
            v-model="bet.homeTeamId"
            :items="teamOptions.filter((x) => x.id != bet.awayTeamId)"
            item-text="name"
            item-value="id"
            outlined
            dense
            filled
            :rules="[validationService.required(bet.homeTeamId)]"
            class="text-field"
          />
        </div>
        <div>
          <span class="text-field-label">Away Team</span>
          <v-select
            v-model="bet.awayTeamId"
            :items="teamOptions.filter((x) => x.id != bet.homeTeamId)"
            item-text="name"
            item-value="id"
            outlined
            dense
            filled
            :rules="[validationService.required(bet.awayTeamId)]"
            class="text-field"
          />
        </div>
        <div>
          <span class="text-field-label">Match Date</span>
          <v-text-field
            v-model="bet.matchDate"
            outlined
            dense
            filled
            hint="YYYY-MM-DD"
            :rules="[
              validationService.required(bet.matchDate),
              validationService.validDate(bet.matchDate),
            ]"
            class="text-field"
          />
        </div>
        <div>
          <NumberField
            field-title="Value"
            :field-value="bet.value"
            :type="numberFieldEnum.Currency"
            @update="(value) => (bet.value = value)"
          />
        </div>
        <div>
          <NumberField
            field-title="Odds"
            :field-value="bet.odds"
            :type="numberFieldEnum.Odds"
            @update="(value) => (bet.odds = value)"
          />
        </div>
        <div>
          <span class="text-field-label">Bet Type</span>
          <v-select
            v-model="bet.type"
            outlined
            dense
            filled
            :rules="[validationService.required(bet.type)]"
            class="text-field"
          />
        </div>
        <div v-if="bet.type == 'Moneyline'">
          <span class="text-field-label">Prediction</span>
          <v-select
            v-model="winnerPrediction"
            :items="get_winner_options()"
            item-text="name"
            item-value="id"
            outlined
            dense
            filled
            :rules="[validationService.required(winnerPrediction)]"
            class="text-field"
            @change="winner_prediction_changed"
          />
        </div>
        <div v-else-if="bet.type == 'Total'">
          <div>
            <NumberField
              field-title="Prediction"
              :field-value="bet.prediction"
              @update="(value) => (bet.prediction = value)"
            />
          </div>
          <div>
            <NumberField
              field-title="Line"
              :field-value="bet.line"
              @update="(value) => (bet.line = value)"
            />
          </div>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>
<script src="./index"></script>