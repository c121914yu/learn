<template>
	<div id="app">
		<p>姓名: {{ name }}</p>
		<p>
			<button @click="changeAge(-1)">-</button>
			年龄: {{ age }}
			<button @click="changeAge(1)">+</button>
		</p>
		<p>
			<button @click="changeYear(-1)">-</button>
			出生年份: {{ year }}
			<button @click="changeYear(1)">+</button>
		</p>
	</div>
</template>

<script>
import { computed, reactive, toRefs, watch } from "vue"
export default {
	props: {
		title: {
			type: String,
			default: "555",
		},
	},
	// Composition API入口，在beforeCreate之前调用，无this
	setup(props, context) {
		// const name = ref("余金隆") //非字符串，而是响应式对象,值用.value获取
		// const age = ref(18)
		// const year = computed({
		// 	get: () => {
		// 		return 2020 - age.value
		// 	},
		// 	set: (val) => {
		// 		age.value = 2020 - val
		// 	},
		// })
		// 使用data统一构造对象
		const data = reactive({
			name: "余金隆",
			age: 18,
			year: computed({
				get: () => {
					return 2020 - data.age
				},
				set: (val) => {
					data.age = 2020 - val
				},
			}),
		})
		function changeAge(n) {
			data.age += n
			console.log(props.title)
		}
		watch(
			() => data.age,
			(newTitle, oldTitle) => {
				console.log(newTitle, oldTitle)
				console.log(context)
				// context.emit("changeAge")
			}
		)
		function changeYear(val) {
			data.year += val
		}
		return { ...toRefs(data), changeAge, changeYear }
	},
}
</script>

<style></style>
