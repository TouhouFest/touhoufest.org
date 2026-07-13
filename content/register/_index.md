+++
title = "Registration & Applications"
+++
<div class="my-5">
  <h2 class="title is-2 mb-4">Event Badge</h2>
  <p class="mb-4">Passes get more expensive the closer we get to the event! Get them while they’re still cheap!</p>
  <p class="mb-4">Please ensure that you understand and abide by our Event Guidelines while attending the event.</p>
  <p class="mb-6">You can verify your badge status and get your QR code <a href="//registration.touhoufest.org/portal">here</a>.</p>
</div>

{{ hero_card(title="2026 Weekend Pass", subtitle="Experience all three days of doujin music, cosplay, tournaments, and festival celebrations right in Torrance.", image="/hero.png", url="//registration.touhoufest.org/touhoufest-2026", button_text="Buy badge") }}


<div class="my-6">
  <h3 class="title is-3 mb-4">2026 Weekend Pass pricing schedule</h3>
  <table class="table is-fullwidth is-bordered pricing-schedule-table">
    <thead>
      <tr class="is-header-row">
        <th>Date</th>
        <th>Full Weekend</th>
        <th>Saturday Pass</th>
        <th>Sunday Pass</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Early Tengu</strong><br>(First 200)</td>
        <td class="is-sold-out"><strike>$40</strike> Sold out</td>
        <td class="is-vcentered has-text-centered is-stay-tuned" rowspan="6">Stay tuned</td>
        <td class="is-vcentered has-text-centered is-stay-tuned" rowspan="6">Stay tuned</td>
      </tr>
      <tr>
        <td><strong>July 1st, 2025</strong></td>
        <td class="is-sold-out"><strike>$55</strike> Sold out</td>
      </tr>
      <tr>
        <td><strong>December 1st, 2025</strong></td>
        <td>$65</td>
      </tr>
      <tr>
        <td><strong>April 1st, 2026</strong></td>
        <td>$75</td>
      </tr>
      <tr>
        <td><strong>June 1st, 2026</strong></td>
        <td>$85</td>
      </tr>
      <tr>
        <td><strong>At-door</strong><br>(June 19th)</td>
        <td>$95</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="my-6 pt-5">
  <h2 class="title is-2 mb-5">Other passes and applications</h2>
</div>

{{ section_divider(title="Exhibitor Applications", id="exhibitors", image="/hero.png") }}
<div class="my-5">
  {{ applications_grid(type="exhibitors") }}
</div>

{{ section_divider(title="Content Applications", id="content", image="/hero.png") }}
<div class="my-5">
  {{ applications_grid(type="content") }}

  {{ cosplay_masquerade() }}
</div>

{{ section_divider(title="Team Applications", id="team", image="/hero.png") }}
<div class="my-5">

  {{ applications_grid(type="team") }}

</div>


<div class="my-6 pt-5">
{{ info_card(title="Event Guidelines", icon="clipboard-list", variant="red", class="my-5", body='<p class="mb-4">Please ensure you understand and abide by our Event Guidelines while attending the event.</p><a class="button is-medium guidelines-btn" href="/about/guidelines">Read Guidelines <span class="fa-solid fa-arrow-right ml-2"></span></a>') }}

{{ discord() }}

{{ newsletter() }}
</div>


