import React, { useState, useEffect } from 'react';

// STAGE 1: REPLACE_BLINKER (The blinker was only the test)
export function StageReplaceBlinker() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '30px', alignItems: 'center', width: '100%', maxWidth: '920px' }}>
        <div className="aa-card" style={{ opacity: 0.65 }}>
          <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>STAGE 15 TEST CIRCUIT</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#F4F7FA' }}>24-Bit Blinker Counter</div>
          <div style={{ background: '#070B13', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#8B98A8' }}>
            always @(posedge clk)<br />
            &nbsp;&nbsp;counter &lt;= counter + 1;<br />
            assign led = counter[23];
          </div>
          <div style={{ fontSize: '12px', color: '#57E6A5' }}>✓ Pipeline verified on physical board</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', color: '#27D7FF' }}>→</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>REPLACE<br />CIRCUIT</div>
        </div>

        <div className="aa-card" style={{ borderColor: 'rgba(39, 215, 255, 0.45)', boxShadow: '0 0 25px rgba(39, 215, 255, 0.15)' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>STAGE 16 REAL PROJECT</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#57E6A5' }}>AI Neural Accelerator</div>
          <div style={{ background: '#070B13', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#27D7FF' }}>
            y = ReLU( Σ(w × x) + b )<br />
            Parallel MAC Array + Weights ROM<br />
            MNIST Handwritten Digit 0–9
          </div>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 700 }}>★ REAL COMPUTATIONAL ENGINE</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 2: AI_MATH (What does the AI actually compute?)
export function StageAIMath() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#27D7FF', letterSpacing: '0.15em' }}>
          THE MATHEMATICAL FOUNDATION OF ARTIFICIAL NEURONS
        </div>
        <div style={{ fontSize: '38px', fontFamily: 'serif', fontWeight: 900, color: '#F4F7FA', margin: '14px 0' }}>
          y = <span style={{ color: '#8A7CFF' }}>Σ</span>(<span style={{ color: '#FFB84D' }}>w</span> × <span style={{ color: '#27D7FF' }}>x</span>) + <span style={{ color: '#4B8DFF' }}>b</span>
        </div>
        <div style={{ fontSize: '14px', color: '#8B98A8', maxWidth: '650px', margin: '0 auto' }}>
          Every single dense layer operation in a neural network breaks down into this elementary pattern: pairwise multiplication of inputs and weights, accumulation into a sum, and addition of bias.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', width: '100%', maxWidth: '850px' }}>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#27D7FF' }}>x</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>INPUT ACTIVATION</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Pixel data or previous layer feature</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#FFB84D' }}>w</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>WEIGHT PARAMETER</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Trained neural coefficient stored in ROM</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#8A7CFF' }}>Σ</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>SUMMATION</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Accumulated sum of all products</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#4B8DFF' }}>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#4B8DFF' }}>b</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#F4F7FA' }}>BIAS TERM</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Threshold offset for neuron activation</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 3: ONE_MAC (One MAC Unit)
export function StageOneMAC() {
  return (
    <div className="aa-wrap">
      <svg width="600" height="220" viewBox="0 0 600 220">
        {/* Input X */}
        <rect x="30" y="40" width="80" height="40" rx="6" fill="#0B132B" stroke="#27D7FF" strokeWidth="2" />
        <text x="70" y="65" fill="#27D7FF" fontSize="14" fontWeight="800" textAnchor="middle">Input x</text>

        {/* Input W */}
        <rect x="30" y="120" width="80" height="40" rx="6" fill="#0B132B" stroke="#FFB84D" strokeWidth="2" />
        <text x="70" y="145" fill="#FFB84D" fontSize="14" fontWeight="800" textAnchor="middle">Weight w</text>

        {/* Lines to multiplier */}
        <path d="M 110 60 L 180 90" stroke="#27D7FF" strokeWidth="2" />
        <path d="M 110 140 L 180 110" stroke="#FFB84D" strokeWidth="2" />

        {/* Multiplier circle */}
        <circle cx="210" cy="100" r="30" fill="#1E1B4B" stroke="#8A7CFF" strokeWidth="2.5" />
        <text x="210" y="108" fill="#F4F7FA" fontSize="24" fontWeight="900" textAnchor="middle">×</text>

        {/* Line to Accumulator */}
        <line x1="240" y1="100" x2="330" y2="100" stroke="#8A7CFF" strokeWidth="2.5" />
        <text x="285" y="90" fill="#8B98A8" fontSize="12" textAnchor="middle">Product (w·x)</text>

        {/* Accumulator circle */}
        <circle cx="360" cy="100" r="30" fill="#064E3B" stroke="#57E6A5" strokeWidth="2.5" />
        <text x="360" y="108" fill="#F4F7FA" fontSize="24" fontWeight="900" textAnchor="middle">+</text>

        {/* Feedback loop */}
        <path d="M 390 100 L 440 100 L 440 170 L 360 170 L 360 130" fill="none" stroke="#57E6A5" strokeWidth="2" strokeDasharray="3 3" />
        <text x="400" y="185" fill="#57E6A5" fontSize="12" textAnchor="middle">ACCUMULATOR REGISTER</text>

        {/* Output */}
        <line x1="440" y1="100" x2="520" y2="100" stroke="#57E6A5" strokeWidth="2.5" />
        <rect x="520" y="80" width="60" height="40" rx="6" fill="#052E16" stroke="#57E6A5" strokeWidth="2" />
        <text x="550" y="105" fill="#57E6A5" fontSize="14" fontWeight="800" textAnchor="middle">y (acc)</text>
      </svg>

      <div style={{ marginTop: '16px', fontSize: '13px', color: '#57E6A5', fontWeight: 800 }}>
        ★ MAC = MULTIPLY + ACCUMULATE: THE COMPUTE WORKHORSE OF ALL AI HARDWARE
      </div>
    </div>
  );
}

// STAGE 4: REPEAT (One MAC is not enough)
export function StageRepeat() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>SCALING ARITHMETIC DENSITY</div>
        <div style={{ fontSize: '20px', fontWeight: 900, color: '#F4F7FA' }}>REPLICATING MAC HARDWARE UNITS</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%', maxWidth: '850px' }}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="aa-card" style={{ textAlign: 'center', borderColor: 'rgba(39, 215, 255, 0.3)' }}>
            <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 700 }}>MAC UNIT #{idx}</div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#27D7FF', margin: '4px 0' }}>
              (x<sub>{idx}</sub> × w<sub>{idx}</sub>) + acc
            </div>
            <div style={{ fontSize: '12px', color: '#57E6A5' }}>INDEPENDENT SILICON SLICE</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '18px', fontSize: '12px', color: '#8B98A8', maxWidth: '650px', textAlign: 'center' }}>
        In software, 8 multiplications take 8 clock instructions sequentially. In an FPGA, we instantiate 8 multipliers that execute in the exact same clock cycle!
      </div>
    </div>
  );
}

// STAGE 5: PARALLELISM (FPGA vs CPU parallelism)
export function StageParallelism() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', maxWidth: '920px', width: '100%' }}>
        <div className="aa-card">
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>CPU CONVENTIONAL EXECUTION</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#F4F7FA' }}>Temporal (Sequential In Time)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0' }}>
            <div style={{ padding: '8px', background: '#090E17', borderLeft: '3px solid #FFB84D', fontSize: '12px', color: '#8B98A8' }}>Cycle 1: MAC 0</div>
            <div style={{ padding: '8px', background: '#090E17', borderLeft: '3px solid #FFB84D', fontSize: '12px', color: '#8B98A8' }}>Cycle 2: MAC 1</div>
            <div style={{ padding: '8px', background: '#090E17', borderLeft: '3px solid #FFB84D', fontSize: '12px', color: '#8B98A8' }}>Cycle 3: MAC 2</div>
            <div style={{ padding: '8px', background: '#090E17', borderLeft: '3px solid #FFB84D', fontSize: '12px', color: '#8B98A8' }}>Cycle 4: MAC 3</div>
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>1 ALU reused over time by instruction program counter.</div>
        </div>

        <div className="aa-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>FPGA HARDWARE EXECUTION</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#57E6A5' }}>Spatial (Simultaneous In Silicon)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '10px 0' }}>
            <div style={{ padding: '10px', background: 'rgba(87, 230, 165, 0.1)', border: '1px solid #57E6A5', borderRadius: '4px', fontSize: '12px', color: '#57E6A5', textAlign: 'center', fontWeight: 700 }}>MAC 0 (Cycle 1)</div>
            <div style={{ padding: '10px', background: 'rgba(87, 230, 165, 0.1)', border: '1px solid #57E6A5', borderRadius: '4px', fontSize: '12px', color: '#57E6A5', textAlign: 'center', fontWeight: 700 }}>MAC 1 (Cycle 1)</div>
            <div style={{ padding: '10px', background: 'rgba(87, 230, 165, 0.1)', border: '1px solid #57E6A5', borderRadius: '4px', fontSize: '12px', color: '#57E6A5', textAlign: 'center', fontWeight: 700 }}>MAC 2 (Cycle 1)</div>
            <div style={{ padding: '10px', background: 'rgba(87, 230, 165, 0.1)', border: '1px solid #57E6A5', borderRadius: '4px', fontSize: '12px', color: '#57E6A5', textAlign: 'center', fontWeight: 700 }}>MAC 3 (Cycle 1)</div>
          </div>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 700 }}>★ All 4 operations finish together in cycle 1!</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 6: DOT_PRODUCT (From MACs to a dot product)
export function StageDotProduct() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>VECTOR MATH IN SILICON</div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#F4F7FA' }}>
          y = x₀w₀ + x₁w₁ + x₂w₂ + ... + xₙwₙ
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '850px', width: '100%', justifyContent: 'center' }}>
        <div className="aa-card" style={{ minWidth: '160px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>INPUT VECTOR [X]</div>
          <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#F4F7FA', marginTop: '6px' }}>
            [x₀, x₁, x₂, ..., xₙ]
          </div>
        </div>

        <div style={{ fontSize: '20px', color: '#8A7CFF' }}>×</div>

        <div className="aa-card" style={{ minWidth: '160px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>WEIGHT VECTOR [W]</div>
          <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#F4F7FA', marginTop: '6px' }}>
            [w₀, w₁, w₂, ..., wₙ]
          </div>
        </div>

        <div style={{ fontSize: '20px', color: '#57E6A5' }}>=</div>

        <div className="aa-card" style={{ minWidth: '220px', textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>ACCUMULATOR SUM</div>
          <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 900, color: '#57E6A5', marginTop: '6px' }}>
            y = Σ (xᵢ · wᵢ)
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Single Neuron Output Activation</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 7: LAYER (Now build a layer)
export function StageLayer() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#8A7CFF' }}>MATRIX TRANSFORMATION</div>
        <div style={{ fontSize: '26px', fontWeight: 900, color: '#F4F7FA' }}>Y = W·X + b</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', width: '100%', maxWidth: '860px' }}>
        <div className="aa-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>INPUT ACTIVATIONS</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#F4F7FA', marginTop: '6px' }}>Vector X</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>N input features</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>WEIGHT MATRIX</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#8A7CFF', marginTop: '6px' }}>Matrix W [M × N]</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>M neurons × N weights each</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>OUTPUT ACTIVATIONS</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#57E6A5', marginTop: '6px' }}>Vector Y</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>M layer outputs</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 8: FIRST_LAYER (784 → 32)
export function StageFirstLayer() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '920px', width: '100%' }}>
        <div className="aa-card" style={{ minWidth: '180px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>INPUT IMAGE</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#27D7FF', marginTop: '4px' }}>28 × 28</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '2px' }}>784 Pixel Values (INT8)</div>
        </div>

        <div style={{ fontSize: '22px', color: '#8A7CFF' }}>→</div>

        <div className="aa-card" style={{ flex: 1, borderColor: '#8A7CFF', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>DENSE LAYER 1 DATAPATH</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#F4F7FA', marginTop: '4px' }}>
            PARALLEL MAC ENGINE
          </div>
          <div style={{ fontSize: '12px', color: '#57E6A5', marginTop: '4px' }}>
            Weights: 784 × 32 = 25,088 parameters
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '2px' }}>
            Streaming multiply-accumulate across time & parallel slices
          </div>
        </div>

        <div style={{ fontSize: '22px', color: '#57E6A5' }}>→</div>

        <div className="aa-card" style={{ minWidth: '180px', textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>LAYER 1 OUTPUT</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#57E6A5', marginTop: '4px' }}>32 FEATURES</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '2px' }}>Distilled representation</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 9: RELU (Nonlinearity: ReLU)
export function StageReLU() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>ACTIVATION FUNCTION</div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#F4F7FA' }}>ReLU(x) = max(0, x)</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center', maxWidth: '850px', width: '100%' }}>
        <div className="aa-card">
          <div style={{ fontSize: '12px', color: '#8B98A8', fontWeight: 800 }}>ACCUMULATOR INPUTS</div>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#F4F7FA', margin: '8px 0' }}>
            [ -4, &nbsp;2, &nbsp;-1, &nbsp;7, &nbsp;3 ]
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Raw signed integers from MAC sums</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'rgba(87, 230, 165, 0.15)', border: '1.5px solid #57E6A5', padding: '10px 16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#57E6A5' }}>ReLU LOGIC</div>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>Sign-bit MUX clamp</div>
          </div>
          <div style={{ fontSize: '20px', color: '#57E6A5', marginTop: '4px' }}>→</div>
        </div>

        <div className="aa-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>ACTIVATED OUTPUTS</div>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', color: '#57E6A5', fontWeight: 900, margin: '8px 0' }}>
            [ &nbsp;0, &nbsp;2, &nbsp;&nbsp;0, &nbsp;7, &nbsp;3 ]
          </div>
          <div style={{ fontSize: '12px', color: '#57E6A5' }}>Negative values zeroed with 1 gate delay!</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 10: SECOND_LAYER (32 → 16)
export function StageSecondLayer() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '900px', width: '100%' }}>
        <div className="aa-card" style={{ minWidth: '160px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>FROM LAYER 1</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#8A7CFF', marginTop: '4px' }}>32 FEATURES</div>
        </div>

        <div style={{ fontSize: '22px', color: '#27D7FF' }}>→</div>

        <div className="aa-card" style={{ flex: 1, borderColor: '#27D7FF', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>LAYER 2 MAC + ReLU</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA', marginTop: '4px' }}>
            32 × 16 = 512 WEIGHTS
          </div>
          <div style={{ fontSize: '12px', color: '#57E6A5', marginTop: '2px' }}>
            Computes high-level feature combinations
          </div>
        </div>

        <div style={{ fontSize: '22px', color: '#57E6A5' }}>→</div>

        <div className="aa-card" style={{ minWidth: '160px', textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>LAYER 2 OUTPUT</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#57E6A5', marginTop: '4px' }}>16 FEATURES</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 11: OUTPUT_LAYER (16 → 10)
export function StageOutputLayer() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', maxWidth: '900px', width: '100%' }}>
        <div className="aa-card" style={{ minWidth: '160px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>FROM LAYER 2</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#8A7CFF', marginTop: '4px' }}>16 FEATURES</div>
        </div>

        <div style={{ fontSize: '22px', color: '#FFB84D' }}>→</div>

        <div className="aa-card" style={{ flex: 1, borderColor: '#FFB84D', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>CLASSIFICATION LAYER</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA', marginTop: '4px' }}>
            16 × 10 = 160 WEIGHTS
          </div>
          <div style={{ fontSize: '12px', color: '#FFB84D', marginTop: '2px' }}>
            Outputs raw prediction score for each digit 0–9
          </div>
        </div>

        <div style={{ fontSize: '22px', color: '#57E6A5' }}>→</div>

        <div className="aa-card" style={{ minWidth: '160px', textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>CLASS SCORES</div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: '#57E6A5', marginTop: '4px' }}>DIGITS 0–9</div>
          <div style={{ fontSize: '12px', color: '#27D7FF' }}>Winner: Digit '7'</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 12: ACCELERATOR_DATAPATH (The complete datapath)
export function StageAcceleratorDatapath() {
  const steps = [
    { name: 'PIXEL BUFFER', role: 'Input Staging', color: '#27D7FF' },
    { name: 'WEIGHT BRAM', role: 'Parameter Stream', color: '#FFB84D' },
    { name: 'PARALLEL MAC', role: 'Multiply-Add', color: '#8A7CFF' },
    { name: 'ACCUMULATOR', role: 'Sum Register', color: '#4B8DFF' },
    { name: 'ReLU LOGIC', role: 'Zero Clamp', color: '#57E6A5' }
  ];

  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>HARDWARE ARCHITECTURE</div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#F4F7FA' }}>THE COMPLETE INFERENCE DATAPATH</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '960px', justifyContent: 'center' }}>
        {steps.map((s, idx) => (
          <React.Fragment key={s.name}>
            <div className="aa-card" style={{ minWidth: '140px', textAlign: 'center', borderColor: s.color }}>
              <div style={{ fontSize: '12px', fontWeight: 900, color: s.color }}>{s.name}</div>
              <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '4px' }}>{s.role}</div>
            </div>
            {idx < steps.length - 1 && <span style={{ fontSize: '18px', color: '#4B8DFF' }}>→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// STAGE 13: CONTROL (Control FSM)
export function StageControl() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px', maxWidth: '880px', width: '100%' }}>
        <div className="aa-card" style={{ borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>CONTROL: FINITE STATE MACHINE (FSM)</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>Coordinates When Data Moves</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '8px 0' }}>
            <div style={{ padding: '6px 10px', background: '#090E17', borderRadius: '4px', fontSize: '12px', color: '#8B98A8' }}>1. S_IDLE: Wait for start strobe</div>
            <div style={{ padding: '6px 10px', background: '#090E17', borderRadius: '4px', fontSize: '12px', color: '#8B98A8' }}>2. S_LOAD: Fetch pixel & weight from RAM</div>
            <div style={{ padding: '6px 10px', background: '#090E17', borderRadius: '4px', fontSize: '12px', color: '#8B98A8' }}>3. S_COMPUTE: Clock the MAC pipelines</div>
            <div style={{ padding: '6px 10px', background: '#090E17', borderRadius: '4px', fontSize: '12px', color: '#8B98A8' }}>4. S_ACCUM: Latch partial sums</div>
            <div style={{ padding: '6px 10px', background: '#090E17', borderRadius: '4px', fontSize: '12px', color: '#57E6A5' }}>5. S_DONE: Signal valid output</div>
          </div>
        </div>

        <div className="aa-card" style={{ borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>DATAPATH BUSES CONTROLLED</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#27D7FF' }}>Controlled Hardware Nets</div>
          <div style={{ fontSize: '12px', color: '#F4F7FA', lineHeight: 1.7 }}>
            • <code>weight_rd_en</code>: Strobe parameter memory<br />
            • <code>mac_clear_acc</code>: Reset partial sum to zero<br />
            • <code>acc_en</code>: Register latch enable strobe<br />
            • <code>layer_mux_sel</code>: Select Layer 1, 2, or 3<br />
            • <code>infer_valid</code>: Transmission ready pin
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 14: MEMORY (Where do weights live?)
export function StageMemory() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center', maxWidth: '880px', width: '100%' }}>
        <div className="aa-card" style={{ minWidth: '260px', textAlign: 'center', borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>ON-CHIP EMBEDDED MEMORY</div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: '#F4F7FA', margin: '6px 0' }}>iCE40UP5K BRAM</div>
          <div style={{ fontSize: '12px', color: '#FFB84D' }}>EBR Blocks (up to 120 Kbits)</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', marginTop: '6px' }}>Zero external RAM latency!</div>
        </div>

        <div style={{ fontSize: '24px', color: '#57E6A5' }}>⇄</div>

        <div className="aa-card" style={{ flex: 1, borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>SYNCHRONOUS WEIGHT STREAMING</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#F4F7FA' }}>Compute Is Only Useful When Data Arrives Fast</div>
          <div style={{ fontSize: '12px', color: '#8B98A8', lineHeight: 1.6, marginTop: '6px' }}>
            Weights are compiled directly into on-chip ROM/BRAM tables.<br />
            Every clock cycle, the exact weight demanded by the active MAC slice is presented on the internal silicon bus.
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 15: COMPLETE_ACCELERATOR (Complete architecture)
export function StageCompleteAccelerator() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#57E6A5' }}>SYSTEM INTEGRATION</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#F4F7FA' }}>THE COMPLETE AI HARDWARE ACCELERATOR</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', width: '100%', maxWidth: '960px' }}>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>1. INPUT BUFFER</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>784 Pixels</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>UART or On-Chip Test ROM</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>2. WEIGHT ROM</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>Trained Model</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Quantized INT8 weights</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>3. MAC CORE + ReLU</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>Arithmetic Slices</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Multipliers + Sum + Clamp</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>4. ARGMAX LOGIC</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#F4F7FA' }}>Digit: 7</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Score comparator output</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 16: RTL_MAPPING (Translate to RTL)
export function StageRTLMapping() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px', maxWidth: '880px', width: '100%' }}>
        <div className="aa-card" style={{ borderColor: '#8A7CFF' }}>
          <div style={{ fontSize: '12px', color: '#8A7CFF', fontWeight: 800 }}>ARCHITECTURAL BLOCK</div>
          <div style={{ fontSize: '13px', color: '#F4F7FA', lineHeight: 1.8 }}>
            • Multiplier (×)<br />
            • Accumulator (+)<br />
            • Weight Memory<br />
            • ReLU Activation<br />
            • Control Engine
          </div>
        </div>

        <div className="aa-card" style={{ borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>SYNTHESIZABLE VERILOG CONSTRUCT</div>
          <div style={{ fontSize: '13px', color: '#57E6A5', lineHeight: 1.8 }}>
            • <code>mult_result &lt;= pixel * weight;</code><br />
            • <code>accumulator &lt;= accumulator + mult_result;</code><br />
            • <code>reg [7:0] weight_rom [0:DEPTH-1];</code><br />
            • <code>assign relu_out = (acc[15] == 1'b0) ? acc : 0;</code><br />
            • <code>always @(posedge clk) case (state) ...</code>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 17: FPGA (Map it into iCE40UP5K)
export function StageFPGA() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#27D7FF' }}>LATTICE iCE40UP5K SILICON MAPPING</div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#F4F7FA' }}>WHERE DOES EACH NEURAL BLOCK LIVE?</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%', maxWidth: '880px' }}>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#27D7FF' }}>
          <div style={{ fontSize: '12px', color: '#27D7FF', fontWeight: 800 }}>DSP BLOCKS / LUTS</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA' }}>MAC Multipliers</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>High-speed 16×16 multiplier silicon cells</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#FFB84D' }}>
          <div style={{ fontSize: '12px', color: '#FFB84D', fontWeight: 800 }}>EBR / BRAM</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA' }}>Weight Storage</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>Dedicated SRAM arrays containing neural weights</div>
        </div>
        <div className="aa-card" style={{ textAlign: 'center', borderColor: '#57E6A5' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>LOGIC CELLS (PLBs)</div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#F4F7FA' }}>FSM & Accumulators</div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>LUT4s and Flip-Flops for control and registers</div>
        </div>
      </div>
    </div>
  );
}

// STAGE 18: DIGIT (The final goal: inference)
export function StageDigit() {
  return (
    <div className="aa-wrap">
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', maxWidth: '880px', width: '100%' }}>
        <div className="aa-card" style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderColor: '#27D7FF' }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#27D7FF', fontFamily: 'monospace' }}>7</div>
            <div style={{ fontSize: '12px', color: '#8B98A8' }}>INPUT IMAGE</div>
          </div>
        </div>

        <div style={{ fontSize: '28px', color: '#57E6A5' }}>→</div>

        <div className="aa-card" style={{ flex: 1, borderColor: '#57E6A5', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>iCE40UP5K AI ACCELERATOR</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: '#F4F7FA', margin: '4px 0' }}>
            784 → 32 → 16 → 10
          </div>
          <div style={{ fontSize: '12px', color: '#8B98A8' }}>
            Pipelines execute across DSP multipliers and logic fabric.
          </div>
        </div>

        <div style={{ fontSize: '28px', color: '#57E6A5' }}>→</div>

        <div className="aa-card" style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderColor: '#57E6A5' }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#57E6A5', fontFamily: 'monospace' }}>7</div>
            <div style={{ fontSize: '12px', color: '#57E6A5', fontWeight: 800 }}>CLASSIFICATION</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// STAGE 19: HANDS_ON_HANDOFF (Handoff to RTL slide)
export function StageHandsOnHandoff() {
  return (
    <div className="aa-wrap">
      <div style={{ textAlign: 'center', maxWidth: '780px' }}>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#57E6A5', letterSpacing: '0.15em' }}>
          ★ ARCHITECTURE COMPLETE ★
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#F4F7FA', margin: '10px 0' }}>
          FROM AI MODEL → FPGA ACCELERATOR
        </h2>
        <div style={{ fontSize: '16px', color: '#27D7FF', fontWeight: 700, marginBottom: '20px' }}>
          INPUT → MAC → ReLU → MAC → ReLU → MAC → OUTPUT
        </div>
        <div style={{ fontSize: '13px', color: '#8B98A8', lineHeight: 1.6 }}>
          We understand the math, the MAC datapath, and the memory structures. Next slide: we examine and write the synthesizable Verilog RTL!
        </div>
      </div>
    </div>
  );
}
