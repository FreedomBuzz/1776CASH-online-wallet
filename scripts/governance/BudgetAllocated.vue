<script setup>
import { computed, toRefs } from 'vue';
import { numberToCurrency } from '../misc.js';
import { cChainParams } from '../chain_params.js';
const props = defineProps({
    currency: String,
    price: Number,
    allocatedBudget: Number,
});
const { currency, price, allocatedBudget } = toRefs(props);
const ticker = computed(() => cChainParams.current.TICKER);
</script>

<template>
    <span
        data-i18n="govAllocBudget"
        style="font-weight: 400; color: #DEDEE0; font-size: 18px"
        >Budget Allocated</span
    >

    <div
        class="governBudgetBox"
        style="
            width: 180px;
            background-color: #202656;
            margin-top: 11px;
            border-radius: 9px;
            padding-left: 13px;
            padding-right: 13px;
            padding-bottom: 6px;
            padding-top: 4px;
        "
    >
        <span class="governBudgetPrimary" style="font-size: 19px; color: #DEDEE0"
            ><span data-testid="allocatedGovernanceBudget">{{
                allocatedBudget.toLocaleString('en-gb', ',', '.') + ' '
            }}</span>
            <span
                class="governBudgetAccent"
                style="
                    color: #EB1B24;
                    font-size: 16px;
                    position: relative;
                    top: 1px;
                "
                >{{ ticker }}</span
            ></span
        >
        <hr
            class="governBudgetDivider"
            style="
                border-top-width: 2px;
                background-color: #121437;
                margin-top: 5px;
                margin-bottom: -2px;
                margin-left: -13px;
                margin-right: -13px;
            "
        />
        <span class="governBudgetSecondary" style="font-size: 12px; color: #b9bfd4"
            ><span data-testid="allocatedGovernanceBudgetValue">{{
                numberToCurrency(allocatedBudget, price)
            }}</span>
            {{ ' ' }}
            <span
                class="governBudgetAccent"
                style="color: #EB1B24"
                data-testid="allocatedGovernanceBudgetCurrency"
                >{{ currency.toUpperCase() }}
            </span>
        </span>
    </div>
</template>
