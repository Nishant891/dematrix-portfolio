# The Mathematicians tool to detect fraud.

This article talks about Benford’s Law used to detect fraud. Mark Nigrini Professor of Accounting & researcher popularized the use of Benford’s Law in fraud detection especially in financial audits.

Benford’s Law, often called the first-digit law, is a mathematical principle describing how often each leading digit appears in many real-world datasets. According to this law, the number “1” shows up as the first digit about 30% of the time, while higher digits, such as “9,” occur far less frequently only around 5% of the time. This pattern emerges in a wide range of naturally occurring numerical data.

![image](https://miro.medium.com/v2/resize:fit:600/format:webp/0*HZjZPPMnje93YyBu)

In the image shown above, the green lines show the pattern natural datasets follow.

The US county population follows the distribution since, it is naturally generated dataset.

A manipulated dataset may not follow similar curve and often has irregular patterns .

## So what about it?

If you plot the first-digit distribution of a company’s financial accounts and the resulting graph closely matches Benford’s Law, it suggests that the data is likely genuine. However, if the distribution deviates significantly from Benford’s expected pattern, it could be a sign that the data has been manipulated or is not authentic.

## How do the natural dataset present themselves?

Natural datasets have 1 as leading digit 30.1% of time.

Below is a graph showing how leading digit from 1–9 appear in natural dataset.

**Digit Probability**

1 — 30.1%  
2 — 17.6%  
3 — 12.5%  
4 — 9.7%  
5 — 7.9%  
6 — 6.7%  
7 — 5.8%  
8 — 5.1%  
9 — 4.6%  

## How to Use It in Financial Data?

You take a large dataset: e.g., invoice amounts, tax records, sales transactions.  
Count how often each leading digit (1–9) appears.  
Plot the frequency.  
Compare it to the Benford distribution.  

**It closely follows Benford’s Law:**  
The data is likely natural or unmanipulated.  

**It significantly diverges:**  
It may be fabricated or manipulated.  

_Example_: A fraudster might make up round-looking numbers, like 4999, 5000, or 7000, skewing the natural frequency.

Here’s a very interesting take on how Bitcoin and NYSE stocks distribution looks as oppose to Benford’s distribution.

![image](https://miro.medium.com/v2/resize:fit:720/format:webp/0*8jcUA2UwY4oyPqPh.png)

![image](https://miro.medium.com/v2/resize:fit:720/format:webp/0*ca4V2gLJea9X8Xb1.png)

## Interpretation

**NYSE Stocks:**  
Stocks on traditional exchanges often show organic, human-influenced behavior.  
Numbers like volume, price changes, and order sizes tend to span multiple magnitudes and aren’t “manicured.”  
Therefore, they are more likely to follow Benford’s Law.

**Bitcoin or Crypto:**  
Crypto markets are:  
- 24/7, highly speculative, and influenced by bots or programmatic trading.  
- Less regulation → more potential manipulated volumes, or synthetic liquidity.  

So the data may be:  
- Less organic.  
- More synthetic or manipulated.  
- Not following a Benford-type distribution — which is not always a sign of fraud, but it’s a statistical anomaly.

## Important Nuances

1. **Benford’s Law doesn’t apply to all datasets.**  
   It works best for datasets that span several orders of magnitude and aren’t constrained.  
   _E.g., populations, accounting entries, electricity bills — YES._  
   _Phone numbers, assigned IDs, prices with fixed range — NO._

2. **It is a red flag, not proof.**  
   Just because data doesn’t follow Benford’s Law doesn’t mean it’s fake — it only warrants investigation.

3. **Better with more data.**  
   Works best when the dataset is large (typically >100 entries, ideally >1000).

4. **Use first-digit or second-digit analysis.**  
   Analysts often check first digit, second digit, and even digit combinations for more accuracy.

## Conclusion

Benford’s Law serves as a powerful tool for detecting statistical anomalies. While it yields insightful and consistent results when applied to financial records of companies listed on the NYSE and other traditional stock exchanges, it tends to be less effective in highly volatile markets like cryptocurrencies, where the data often deviates from expected patterns.