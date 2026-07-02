# Outreach Automation

This site is static, so GitHub Pages itself cannot send grant, sponsorship, or partnership emails.

The safest approach is:

1. Keep templates and lead structure in this repo.
2. Use Google Sheets plus a mail merge tool or Apps Script to send.
3. Keep credentials out of the website and out of client-side JavaScript.

## Recommended Workflow

1. Track leads in a spreadsheet with:
   - organization_name
   - contact_name
   - contact_email
   - organization_type
   - location
   - status
   - last_contacted
   - notes
2. Draft reusable outreach templates.
3. Use Google Sheets mail merge or Gmail Apps Script for sending.
4. Log replies and follow-ups in the same sheet.

## Outreach Categories

- Grants
- Corporate sponsorships
- Nonprofit partnerships
- Community event partners

## Message Starters

### Grant outreach

Subject:
`Grant inquiry from Garments4Goodness`

Body:
`Hello [Name],`

`My name is [Your Name], and I’m reaching out on behalf of Garments4Goodness, a student-led organization focused on clothing access and sustainability. We organize clothing drives, donation box initiatives, and educational outreach that make sustainable action more accessible in local communities.`

`We would love to learn whether [Organization Name] is currently accepting applications or conversations related to grants that support youth-led service, community access, or sustainability work.`

`Thank you for your time, and I’d be happy to share more about our work.`

`Best,`

### Corporate sponsorship outreach

Subject:
`Partnership inquiry from Garments4Goodness`

Body:
`Hello [Name],`

`I’m reaching out from Garments4Goodness, a student-led organization that organizes clothing drives, sustainability education, and chapter-based community outreach. We’re looking to build partnerships with organizations that care about community impact and accessible giving.`

`I’d love to explore whether there may be an opportunity for sponsorship, event support, or a local collaboration with [Organization Name].`

`Thank you for your time.`

`Best,`

### Nonprofit partnership outreach

Subject:
`Collaboration inquiry from Garments4Goodness`

Body:
`Hello [Name],`

`I’m reaching out from Garments4Goodness to explore a possible partnership with [Organization Name]. Our chapters organize clothing collection and sustainability-focused outreach, and we’d love to connect with organizations doing aligned community work.`

`If there’s interest, we would be glad to discuss donation coordination, joint events, or educational collaboration.`

`Best,`

## Automation Note

If you want fully automated sending later, use an external tool such as:

- Google Sheets mail merge
- Gmail Apps Script
- Zapier
- Make

Do not build email sending directly into the static website.
