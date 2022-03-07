<template>
    <div class="border-2 rounded mb-2">
        <div class=" bg-blue-600 text-white p-4 font-bold rounded" @click="isOpen = !isOpen">
            {{title}} 
            <!-- <span class="text-right text-white">
                <i class="fa fa-plus"></i>
            </span> -->
        </div>
        <div class="p-2 border-2 rounded" :class="isOpen ? 'd-block' : 'hidden'">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'Accordion',
    props: {
        title: String,
    },
    data() {
        return {
            isOpen: false,
        }
    }
}
</script>

