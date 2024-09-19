const components: Recordable = import.meta.glob('./*.vue', {
  eager: true,
})

const skeletonMap: Recordable = {}

for (const key in components) {
  const component = (components[key] as Recordable).default
  skeletonMap[component.name as string] = component
}

export default skeletonMap