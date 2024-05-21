/*
 * This React component is adapted from the "shadcn-landing-page" repository
 * by leoMirandaa, available under the MIT License.
 *
 * Repository: https://github.com/leoMirandaa/shadcn-landing-page
 * License: MIT (https://opensource.org/licenses/MIT)
 */

export const Statistics = () => {
  type statsProps = {
    quantity: string
    description: string
  }

  const stats: Array<statsProps> = [
    {
      quantity: "2.7K+",
      description: "Users",
    },
    {
      quantity: "1.8K+",
      description: "Subscribers",
    },
    {
      quantity: "112",
      description: "Downloads",
    },
    {
      quantity: "4",
      description: "Products",
    },
  ]

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl ">{quantity}</h2>
            <p className="text-muted-foreground text-xl">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
