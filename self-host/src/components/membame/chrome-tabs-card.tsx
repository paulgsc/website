import { getChromeTabs } from "@/actions/fetch-tabs"
import { useQuery } from "@tanstack/react-query"

const ChromeTabsCard = () => {
  const { data } = useQuery({
    queryKey: ["chrome-tabs"],
    queryFn: async () => await getChromeTabs(),
    retry: true,
    retryDelay: 500,
  })
  return (
    <div className="mt-24 flex w-full justify-center">
      <ul>
        We prepared something nice
        {data?.map((tab) => (
          <li key={tab.id}>
            <p>{tab.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChromeTabsCard
