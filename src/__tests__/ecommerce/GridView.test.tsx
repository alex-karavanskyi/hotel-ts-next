import { screen, render } from '@testing-library/react'
import { GridView } from '@/components/ecommerce'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import productReducer from '@/redux/features/productSlice'
import favoriteReducer from '@/redux/features/favoriteSlice'

describe('GridView', () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        favorite: favoriteReducer,
        products: productReducer,
      },
    })
  it('render correctly', () => {
    const store = createTestStore()

    render(
      <Provider store={store}>
        <GridView
          products={[
            {
              id: 'rec69hj6QLF5zEjue',
              name: 'Rowenta X-Plorer',
              price: 477,
              description:
                'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
              category: 'Misc',
              image:
                'https://v5.airtableusercontent.com/v3/u/36/36/1735927200000/z1DGYY2OwoRZbvhrrDDN7A/w1Mz_ziHyacFNEWhG20n9-9402zZeOrO_8Hl08ziofX1k04NPQxGz5Bpukazy2Y-vDBOH0WckJtDMDsT97U5ULKsHXAbW3O0f7E7DK28kuUh325yvhA1LacIvbnNSrhcR6gktaXkjthLToYH2twKRNX4yLJvD7rSvq1DK9pafxU/9_ssyMBUu_Cn3gwqDuN_3fojw58rg4Lyfag_pangujw',
              images: [],
            },
            {
              id: 'rec6b9Eg8wLI02z6s',
              name: 'Roborock S8',
              price: 575,
              description:
                'Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge',
              category: 'Misc',
              image:
                'https://v5.airtableusercontent.com/v3/u/36/36/1735927200000/YieCsTEpUT8lDPRjqfcYWg/CHkgL9-0l9AvGrfo94YdgqNGJaghkmlgHd_YXwG1QAP2iSkTfqWSl6MsIebct5DtdTHaZ6xty5HI3WU3SjfI_EcoTmS2_s9tbRBTLIhjbPS_VcgB3bG3mECbnkz8cKqaPefFwOjUGgnNWN5g62uM4o_d1J-r7hHxEbNpBwvzLBY/psMEKs-Azx8sqC_ldD59loQ0GCp9su67li579XWJdgE',
              images: [],
            },
          ]}
        />
      </Provider>
    )
    expect(screen.getByRole('list')).toMatchSnapshot()
  })
})
