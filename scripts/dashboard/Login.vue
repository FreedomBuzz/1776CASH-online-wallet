<script setup>
import VanityGen from './VanityGen.vue';
import CreateWallet from './CreateWallet.vue';
import AccessWallet from './AccessWallet.vue';
import { toRefs } from 'vue';

const emit = defineEmits(['import-wallet']);

const props = defineProps({
    advancedMode: Boolean,
});
const { advancedMode } = toRefs(props);
const importLock = defineModel('importLock');

function importWallet(importObj) {
    if (!importLock.value) {
        importLock.value = true;
        emit('import-wallet', importObj);
    }
}
</script>

<template>
    <div
        class="row m-0 justify-content-center"
        data-testid="loginCardGrid"
    >
        <CreateWallet
            :advanced-mode="advancedMode"
            @import-wallet="
                (mnemonic, password, label, blockCount) =>
                    importWallet({
                        type: 'hd',
                        secret: mnemonic,
                        password,
                        blockCount,
                        label,
                    })
            "
            :import-lock="importLock"
        />
        <VanityGen
            @import-wallet="
                (wif, label) =>
                    importWallet({ type: 'legacy', secret: wif, label })
            "
        />

        <AccessWallet
            :advancedMode="advancedMode"
            @import-wallet="
                (secret, password, label) =>
                    importWallet({ type: 'hd', secret, password, label })
            "
        />
    </div>
</template>
